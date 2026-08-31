import React from 'react';
import { Box, Typography, Paper, Card, CardContent } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export const About: React.FC = () => {
  return (
    <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* Title */}
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
          <InfoIcon sx={{ color: '#070913', fontSize: '26px' }} />
        </Box>
        <Typography
          variant="h3"
          sx={{
            background: 'linear-gradient(90deg, #ffffff 0%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          About Secret Notes ZK Model
        </Typography>
      </Box>

      {/* Intro Paper */}
      <Paper sx={{ p: 5, border: '1px solid rgba(56, 189, 248, 0.2)' }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#38bdf8' }}>
          Privacy Demystified
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.05rem' }}>
          Secret Notes is a next-generation decentralized application built on top of the Midnight Network. While
          typical smart contracts broadcast user choices, sensitive data, or state changes directly to the public
          blockchain, Secret Notes keeps your note plaintext, titles, and edit histories strictly local in client
          storage. Only zero-knowledge proofs and cryptographic hashes are submitted on-chain.
        </Typography>
      </Paper>

      {/* Grid of ZK principles */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gap: 4,
        }}
      >
        <Card sx={{ p: 1 }}>
          <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box
              sx={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <VpnKeyIcon sx={{ color: '#38bdf8', fontSize: '28px' }} />
            </Box>
            <Typography variant="h5" sx={{ color: '#f8fafc' }}>
              Note Commitments
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Every note is hashed with a cryptographically secure random 32-byte salt and the owner&apos;s secret key:
              <Box
                component="div"
                sx={{
                  fontFamily: '"Space Grotesk", monospace',
                  background: 'rgba(7, 9, 19, 0.8)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  color: '#38bdf8',
                  p: 1.5,
                  borderRadius: '10px',
                  mt: 1.5,
                  fontSize: '0.8rem',
                  wordBreak: 'break-all',
                }}
              >
                commitment = persistentHash([sk, id, noteHash, salt])
              </Box>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ p: 1 }}>
          <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box
              sx={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'rgba(192, 132, 252, 0.08)',
                border: '1px solid rgba(192, 132, 252, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <VisibilityOffIcon sx={{ color: '#c084fc', fontSize: '28px' }} />
            </Box>
            <Typography variant="h5" sx={{ color: '#f8fafc' }}>
              Nullifiers
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
              To edit or delete a note without revealing which note is being modified, the application generates a
              deterministic nullifier:
              <Box
                component="div"
                sx={{
                  fontFamily: '"Space Grotesk", monospace',
                  background: 'rgba(7, 9, 19, 0.8)',
                  border: '1px solid rgba(192, 132, 252, 0.2)',
                  color: '#c084fc',
                  p: 1.5,
                  borderRadius: '10px',
                  mt: 1.5,
                  fontSize: '0.8rem',
                  wordBreak: 'break-all',
                }}
              >
                nullifier = persistentHash([pad(&quot;note:nullifier&quot;), id, sk])
              </Box>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ p: 1 }}>
          <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box
              sx={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'rgba(45, 212, 191, 0.08)',
                border: '1px solid rgba(45, 212, 191, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SecurityIcon sx={{ color: '#2dd4bf', fontSize: '28px' }} />
            </Box>
            <Typography variant="h5" sx={{ color: '#f8fafc' }}>
              Local ZK Proofs
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Proofs are compiled and executed inside the user&apos;s browser using Midnight&apos;s WASM-compiled
              client-side prover. Your wallet signs transaction bindings and submits them to the network.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Technical workflow mapping */}
      <Paper
        sx={{ p: 5, display: 'flex', flexDirection: 'column', gap: 3.5, border: '1px solid rgba(56, 189, 248, 0.2)' }}
      >
        <Typography variant="h5" sx={{ color: '#38bdf8' }}>
          Data Flow and Storage Architecture
        </Typography>

        <Box sx={{ border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: '16px', overflow: 'hidden' }}>
          {/* Header row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: 'rgba(56, 189, 248, 0.08)',
              p: 2.5,
              borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#38bdf8' }}>
              Client-Side (Private & Local)
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#c084fc' }}>
              On-Chain (Public & Ledger)
            </Typography>
          </Box>
          {/* Content rows */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              p: 2.5,
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <Typography variant="body2" sx={{ color: '#f8fafc', fontWeight: 500 }}>
              Note Title & plain text Content
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              None (Completely Hidden)
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              p: 2.5,
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <Typography variant="body2" sx={{ color: '#f8fafc', fontWeight: 500 }}>
              Wallet Secret Seed / Private Key
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              None (Never leaves your wallet)
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              p: 2.5,
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <Typography variant="body2" sx={{ color: '#f8fafc', fontWeight: 500 }}>
              Random note identifiers and salts
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              None (Stored in local storage)
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', p: 2.5 }}>
            <Typography variant="body2" sx={{ color: '#f8fafc', fontWeight: 500 }}>
              ZKP prover execution data
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Hashed commitments & Nullifiers lists
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
