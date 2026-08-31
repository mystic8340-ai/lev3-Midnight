import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'rgba(7, 9, 19, 0.75)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '36px 0',
        mt: 'auto',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <LockIcon sx={{ color: '#38bdf8', fontSize: '20px' }} />
            <Typography variant="body2" sx={{ color: '#94a3b8', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              © {new Date().getFullYear()} Secret Notes. Powered by Midnight Network ZK privacy.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3.5 }}>
            <Link
              href="https://midnight.network"
              target="_blank"
              rel="noopener"
              sx={{
                color: '#94a3b8',
                textDecoration: 'none',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'color 0.3s ease',
                '&:hover': { color: '#38bdf8' },
              }}
            >
              Official Website
            </Link>
            <Link
              href="https://docs.midnight.network"
              target="_blank"
              rel="noopener"
              sx={{
                color: '#94a3b8',
                textDecoration: 'none',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'color 0.3s ease',
                '&:hover': { color: '#38bdf8' },
              }}
            >
              Developer Docs
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
