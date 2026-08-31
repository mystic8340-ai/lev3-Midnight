import React from 'react';
import { Paper, Typography, Box, IconButton, Chip, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import CodeIcon from '@mui/icons-material/Code';
import { Note } from '../../../api/src/index';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <Paper
      sx={{
        p: 3.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        background: 'rgba(15, 23, 42, 0.65)',
        border: '1px solid rgba(56, 189, 248, 0.15)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(56, 189, 248, 0.4)',
          boxShadow: '0 12px 36px rgba(56, 189, 248, 0.18)',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <LockIcon sx={{ color: '#38bdf8', fontSize: '20px' }} />
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700,
              color: '#f8fafc',
              wordBreak: 'break-word',
            }}
          >
            {note.title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Edit Note (will generate update ZK proof)">
            <IconButton
              size="small"
              onClick={() => onEdit(note)}
              sx={{ color: '#38bdf8', '&:hover': { background: 'rgba(56, 189, 248, 0.12)' } }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Note (will generate delete ZK proof)">
            <IconButton
              size="small"
              onClick={() => onDelete(note)}
              sx={{ color: '#f43f5e', '&:hover': { background: 'rgba(244, 63, 94, 0.12)' } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Content */}
      <Typography
        variant="body2"
        sx={{
          color: '#cbd5e1',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          flexGrow: 1,
          minHeight: '60px',
          lineHeight: 1.7,
          fontSize: '0.95rem',
        }}
      >
        {note.content}
      </Typography>

      {/* Privacy Metadata (Commitment & Salt) */}
      <Box
        sx={{
          pt: 2.5,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CodeIcon sx={{ color: '#c084fc', fontSize: '15px' }} />
          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
            ZK Commitment (stored on-chain):
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontFamily: '"Space Grotesk", monospace',
            wordBreak: 'break-all',
            background: 'rgba(7, 9, 19, 0.8)',
            border: '1px solid rgba(192, 132, 252, 0.2)',
            color: '#c084fc',
            p: 1,
            borderRadius: '8px',
            display: 'block',
            fontSize: '0.75rem',
          }}
        >
          {note.commitment.substring(0, 16)}...{note.commitment.substring(note.commitment.length - 16)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <KeyIcon sx={{ color: '#2dd4bf', fontSize: '15px' }} />
          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
            Random Salt (stored locally):
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontFamily: '"Space Grotesk", monospace',
            wordBreak: 'break-all',
            background: 'rgba(7, 9, 19, 0.8)',
            border: '1px solid rgba(45, 212, 191, 0.2)',
            color: '#2dd4bf',
            p: 1,
            borderRadius: '8px',
            display: 'block',
            fontSize: '0.75rem',
          }}
        >
          {note.salt.substring(0, 16)}...{note.salt.substring(note.salt.length - 16)}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Chip
            label="Local Storage"
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              height: '22px',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          />
          <Chip
            label="Shielded ZK Proof"
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'rgba(192, 132, 252, 0.3)',
              color: '#c084fc',
              height: '22px',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};
