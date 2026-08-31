import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useContract } from '../hooks/useContract';
import { useWallet } from '../hooks/useWallet';
import { NoteCard } from '../components/NoteCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { Toast } from '../components/Toast';
import { Note } from '../../../api/src/index';

export const MyNotes: React.FC = () => {
  const { isConnected } = useWallet();
  const { contractAddress } = useContract();
  const { notes, createNote, updateNote, deleteNote, isWorking, isGeneratingProof, txHash, error } = useNotes();

  // Modal / Dialog States
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  // Form States
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Toast notification state
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>('success');

  const handleShowToast = (msg: string, severity: 'success' | 'error') => {
    setToastMessage(msg);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleCreateOpen = () => {
    setTitle('');
    setContent('');
    setCreateOpen(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setCreateOpen(false);
    try {
      await createNote(title.trim(), content.trim());
      handleShowToast('Private Note created successfully! Commitment stored on-chain.', 'success');
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to create note.';
      handleShowToast(errMsg, 'error');
    }
  };

  const handleEditOpen = (note: Note) => {
    setActiveNote(note);
    setTitle(note.title);
    setContent(note.content);
    setEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeNote || !title.trim() || !content.trim()) return;
    setEditOpen(false);
    try {
      await updateNote(activeNote.id, title.trim(), content.trim());
      handleShowToast('Private Note updated! New commitment stored, old commitment nullified.', 'success');
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to update note.';
      handleShowToast(errMsg, 'error');
    }
  };

  const handleDeleteOpen = (note: Note) => {
    setActiveNote(note);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!activeNote) return;
    setDeleteOpen(false);
    try {
      await deleteNote(activeNote.id);
      handleShowToast('Private Note deleted! On-chain commitment nullified.', 'success');
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to delete note.';
      handleShowToast(errMsg, 'error');
    }
  };

  if (!isConnected) {
    return (
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 5, textAlign: 'center', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
          <ErrorIcon sx={{ color: '#f43f5e', fontSize: '56px', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 1.5, color: '#f8fafc' }}>
            Wallet Disconnected
          </Typography>
          <Typography variant="body1" sx={{ mb: 3.5, color: '#94a3b8', maxWidth: '500px', mx: 'auto' }}>
            Please connect your wallet first on the home screen to access your private notes.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go to Home
          </Button>
        </Paper>
      </Box>
    );
  }

  if (!contractAddress) {
    return (
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 5, textAlign: 'center', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <ErrorIcon sx={{ color: '#38bdf8', fontSize: '56px', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 1.5, color: '#f8fafc' }}>
            No Active Smart Contract
          </Typography>
          <Typography variant="body1" sx={{ mb: 3.5, color: '#94a3b8', maxWidth: '500px', mx: 'auto' }}>
            A deployed or joined contract instance is required to query note commitments.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/dashboard">
            Open Dashboard
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Loading Spinners */}
      <LoadingSpinner open={isGeneratingProof} message="Generating local ZK proof..." />
      <LoadingSpinner
        open={isWorking && !isGeneratingProof}
        message="Broadcasting transaction to Midnight network..."
      />

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #c084fc 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.35)',
            }}
          >
            <DescriptionIcon sx={{ color: '#070913', fontSize: '26px' }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              background: 'linear-gradient(90deg, #ffffff 0%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            My Private Notes
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateOpen}
          startIcon={<NoteAddIcon />}
          sx={{ px: 3, py: 1.2 }}
        >
          Create Note
        </Button>
      </Box>

      {/* Transaction alerts */}
      {txHash && (
        <Alert
          severity="info"
          sx={{
            borderRadius: '14px',
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
          }}
        >
          Last Transaction Hash:{' '}
          <span style={{ fontFamily: '"Space Grotesk", monospace', fontWeight: 700 }}>{txHash}</span>
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: '14px' }}>
          {error}
        </Alert>
      )}

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <Paper
          sx={{
            p: 8,
            textAlign: 'center',
            background: 'rgba(15, 23, 42, 0.3)',
            borderStyle: 'dashed',
            borderColor: 'rgba(56, 189, 248, 0.2)',
          }}
        >
          <DescriptionIcon sx={{ color: 'rgba(56, 189, 248, 0.25)', fontSize: '72px', mb: 2 }} />
          <Typography variant="h5" sx={{ color: '#f8fafc', mb: 1 }}>
            No Shielded Notes
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3.5, maxWidth: '450px', mx: 'auto' }}>
            You haven&apos;t created any private notes yet. Click the button above to create your first encrypted note!
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3.5,
          }}
        >
          {notes.map((note) => (
            <Box key={note.id}>
              <NoteCard note={note} onEdit={handleEditOpen} onDelete={handleDeleteOpen} />
            </Box>
          ))}
        </Box>
      )}

      {/* CREATE DIALOG */}
      <Dialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              background: 'rgba(7, 9, 19, 0.95)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '24px',
              backdropFilter: 'blur(24px)',
            },
          },
        }}
      >
        <Box component="form" onSubmit={handleCreateSubmit}>
          <DialogTitle sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#38bdf8' }}>
            Create Private Note
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField
              label="Title"
              placeholder="e.g. Secret Seed Phrase / Private Key"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Content"
              placeholder="Enter confidential note body..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={5}
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setCreateOpen(false)} variant="outlined" color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Generate ZK Proof & Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              background: 'rgba(7, 9, 19, 0.95)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '24px',
              backdropFilter: 'blur(24px)',
            },
          },
        }}
      >
        <Box component="form" onSubmit={handleEditSubmit}>
          <DialogTitle sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#38bdf8' }}>
            Edit Private Note
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={5}
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setEditOpen(false)} variant="outlined" color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Prove & Update
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* DELETE MODAL */}
      <ConfirmationModal
        open={deleteOpen}
        title="Delete Private Note"
        message={`Are you sure you want to delete "${activeNote?.title}"? This will invalidate the note, submit a nullifier on-chain, and permanently remove the note content from local storage.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteOpen(false)}
        confirmText="Prove & Delete"
      />

      {/* TOAST notifications */}
      <Toast open={toastOpen} message={toastMessage} severity={toastSeverity} onClose={() => setToastOpen(false)} />
    </Box>
  );
};
