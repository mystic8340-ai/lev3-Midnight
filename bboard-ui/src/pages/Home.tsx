import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import LockIcon from '@mui/icons-material/Lock';
import StorageIcon from '@mui/icons-material/Storage';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { WalletCard } from '../components/WalletCard';

export const Home: React.FC = () => {
  const { isConnected } = useWallet();

  const features = [
    {
      icon: <LockIcon sx={{ color: '#38bdf8', fontSize: '36px' }} />,
      title: 'Shielded Notes',
      description: 'Your notes are encrypted client-side. Raw plaintext data is never broadcast to the network.',
    },
    {
      icon: <ShieldIcon sx={{ color: '#c084fc', fontSize: '36px' }} />,
      title: 'Zero-Knowledge Proofs',
      description: 'Prove ownership and execute note operations on-chain without revealing private keys or contents.',
    },
    {
      icon: <StorageIcon sx={{ color: '#2dd4bf', fontSize: '36px' }} />,
      title: 'On-Chain Commitments',
      description: 'Only cryptographic hash commitments and nullifiers reside securely on the Midnight ledger.',
    },
  ];

  return (
    <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
          gap: 6,
          alignItems: 'center',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.2,
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              padding: '8px 20px',
              borderRadius: '30px',
              mb: 3.5,
              backdropFilter: 'blur(10px)',
            }}
          >
            <AutoAwesomeIcon sx={{ color: '#38bdf8', fontSize: '18px' }} />
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                color: '#38bdf8',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Zero-Knowledge Architecture
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.5rem' },
              lineHeight: 1.08,
              mb: 3.5,
              background: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 50%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Private Note Storage,
            <br /> Shielded On-Chain Proofs.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              mb: 4.5,
              lineHeight: 1.7,
              color: '#94a3b8',
              maxWidth: '640px',
              fontSize: '1.1rem',
            }}
          >
            Secret Notes leverages Midnight zero-knowledge smart contracts. Write notes that remain 100% private to you
            while relying on cryptographic proofs on the ledger.
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
            {isConnected ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/dashboard"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Go to Dashboard
                </Button>
                <Button variant="outlined" color="primary" component={Link} to="/notes" sx={{ px: 4, py: 1.5 }}>
                  Open My Notes
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.getElementById('wallet-card-section')?.scrollIntoView({ behavior: 'smooth' })}
                endIcon={<ArrowForwardIcon />}
                sx={{ px: 4, py: 1.5 }}
              >
                Connect Wallet to Start
              </Button>
            )}
          </Box>
        </Box>

        <Box id="wallet-card-section">
          <WalletCard />
        </Box>
      </Box>

      {/* Features Grid */}
      <Box>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 1.5,
            background: 'linear-gradient(90deg, #ffffff 0%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Core Protocol Features
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 7,
            textAlign: 'center',
            maxWidth: '640px',
            mx: 'auto',
            color: '#94a3b8',
            fontSize: '1.05rem',
          }}
        >
          Built upon state-of-the-art Midnight zero-knowledge technology for uncompromised privacy.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 4,
          }}
        >
          {features.map((feature, idx) => (
            <Card key={idx} sx={{ p: 1 }}>
              <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box
                  sx={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'rgba(56, 189, 248, 0.06)',
                    border: '1px solid rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h5" sx={{ color: '#f8fafc' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Technical Breakdown Section */}
      <Card
        sx={{
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(192, 132, 252, 0.05) 100%)',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          p: 2,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2.2fr 0.8fr' },
              gap: 5,
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  mb: 2.5,
                  background: 'linear-gradient(90deg, #38bdf8 0%, #c084fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                How Midnight Privacy Works
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.75, color: '#94a3b8', fontSize: '1.025rem' }}>
                Midnight executes smart contract logic locally on your client device. When creating a note, your client
                generates a cryptographic hash commitment of the note content, salt, and private secret key. Only this
                hash commitment is broadcast to the network. When updating or deleting notes, ZK proofs verify your
                authorization without disclosing private state.
              </Typography>
              <Button variant="outlined" color="primary" component={Link} to="/about" startIcon={<VerifiedUserIcon />}>
                Read Architectural Whitepaper
              </Button>
            </Box>
            <Box sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
              <ShieldIcon
                sx={{
                  fontSize: '160px',
                  color: 'rgba(56, 189, 248, 0.15)',
                  filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.2))',
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
