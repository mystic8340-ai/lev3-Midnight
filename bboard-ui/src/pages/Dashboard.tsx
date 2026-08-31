import React from 'react';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldIcon from '@mui/icons-material/Shield';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { useContract } from '../hooks/useContract';
import { useNotes } from '../hooks/useNotes';
import { DeploymentCard } from '../components/DeploymentCard';
import { StatusBadge } from '../components/StatusBadge';

export const Dashboard: React.FC = () => {
  const { isConnected, walletAddress, network } = useWallet();
  const { contractAddress } = useContract();
  const { notes } = useNotes();

  return (
    <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', gap: 5 }}>
      {/* Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.35)',
          }}
        >
          <DashboardIcon sx={{ color: '#070913', fontSize: '26px' }} />
        </Box>
        <Typography
          variant="h3"
          sx={{
            background: 'linear-gradient(90deg, #ffffff 0%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Application Dashboard
        </Typography>
      </Box>

      {!isConnected ? (
        <Paper sx={{ p: 5, textAlign: 'center', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
          <ErrorIcon sx={{ color: '#f43f5e', fontSize: '56px', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 1.5, color: '#f8fafc' }}>
            Wallet Disconnected
          </Typography>
          <Typography variant="body1" sx={{ mb: 3.5, color: '#94a3b8', maxWidth: '500px', mx: 'auto' }}>
            Please connect your Midnight wallet on the home screen to access the secret notes workspace.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/" endIcon={<ArrowForwardIcon />}>
            Go to Home Screen
          </Button>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          {/* Left panel: Quick status stats */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6" sx={{ color: '#38bdf8' }}>
                System Connection Status
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                    Lace / Midnight Address
                  </Typography>
                  <StatusBadge status="connected" label="Connected" />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: '"Space Grotesk", monospace',
                    background: 'rgba(7, 9, 19, 0.8)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    color: '#38bdf8',
                    p: 1.5,
                    borderRadius: '10px',
                    wordBreak: 'break-all',
                    fontWeight: 600,
                  }}
                >
                  {walletAddress}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                    Network ID
                  </Typography>
                  <StatusBadge status="info" label={network || 'Preprod'} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                    Contract Status
                  </Typography>
                  <StatusBadge
                    status={contractAddress ? 'connected' : 'disconnected'}
                    label={contractAddress ? 'Initialized' : 'Not Deployed'}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                    Private Notes Decrypted
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 700,
                      color: '#2dd4bf',
                    }}
                  >
                    {notes.length} Notes
                  </Typography>
                </Box>
              </Box>

              {contractAddress && (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/notes"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 2 }}
                >
                  Open Notes Workspace
                </Button>
              )}
            </Paper>

            {/* Privacy note explanation card */}
            <Paper
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%)',
                borderColor: 'rgba(45, 212, 191, 0.25)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <ShieldIcon sx={{ color: '#2dd4bf', fontSize: '28px' }} />
                <Typography variant="h6" sx={{ color: '#2dd4bf' }}>
                  Observable Privacy Check
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.7 }}>
                Midnight ledger states verify ZK proof validation results. A block explorer or public crawler sees only
                empty constructor deploy events, Note commitment hashes inside the `notes` map, and 32-byte nullifiers.
                The actual contents remain completely encrypted locally.
              </Typography>
            </Paper>
          </Box>

          {/* Right panel: Deployment and Joint actions */}
          <Box>
            <DeploymentCard />
          </Box>
        </Box>
      )}
    </Box>
  );
};
