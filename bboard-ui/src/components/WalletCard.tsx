import React from 'react';
import { Paper, Typography, Box, Button, CircularProgress } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import ErrorIcon from '@mui/icons-material/Error';
import { useWallet } from '../hooks/useWallet';
import { useNetwork } from '../hooks/useNetwork';

export const WalletCard: React.FC = () => {
  const { walletAddress, connectionStatus, walletError, connectWallet, disconnectWallet, network } = useWallet();
  const { isWrongNetwork, requiredNetwork, reconnect } = useNetwork();

  const getStatusColor = () => {
    if (isWrongNetwork) return '#f43f5e';
    if (connectionStatus === 'connected') return '#34d399';
    if (connectionStatus === 'connecting') return '#fbbf24';
    return '#64748b';
  };

  const getStatusText = () => {
    if (isWrongNetwork) return 'Wrong Network';
    if (connectionStatus === 'connected') return 'Connected';
    if (connectionStatus === 'connecting') return 'Connecting...';
    return 'Disconnected';
  };

  return (
    <Paper
      sx={{
        p: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        border: '1px solid rgba(56, 189, 248, 0.2)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WalletIcon sx={{ color: '#38bdf8', fontSize: '22px' }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, color: '#f8fafc' }}
          >
            Midnight Wallet
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            background: 'rgba(7, 9, 19, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            px: 1.8,
            py: 0.6,
            borderRadius: '20px',
          }}
        >
          <Box
            sx={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: getStatusColor(),
              boxShadow: `0 0 10px ${getStatusColor()}`,
            }}
          />
          <Typography
            variant="caption"
            sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: getStatusColor() }}
          >
            {getStatusText()}
          </Typography>
        </Box>
      </Box>

      {/* Connection info */}
      {connectionStatus === 'connected' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 0.8, fontWeight: 500 }}>
              Shielded Coin Public Key (Address)
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Space Grotesk", monospace',
                wordBreak: 'break-all',
                background: 'rgba(7, 9, 19, 0.8)',
                p: 1.8,
                borderRadius: '12px',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                color: '#38bdf8',
                fontSize: '0.85rem',
              }}
            >
              {walletAddress}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <WifiTetheringIcon sx={{ color: '#c084fc', fontSize: '20px' }} />
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Network:{' '}
              <span style={{ fontWeight: 700, color: '#c084fc', fontFamily: '"Space Grotesk", sans-serif' }}>
                {network}
              </span>
            </Typography>
          </Box>

          {isWrongNetwork && (
            <Paper
              sx={{
                p: 2.5,
                background: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: '14px',
                display: 'flex',
                gap: 1.5,
              }}
            >
              <ErrorIcon sx={{ color: '#f43f5e' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ color: '#f43f5e', fontWeight: 700 }}>
                  Network Mismatch Detected
                </Typography>
                <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                  Your wallet is connected to {network}, but this app requires{' '}
                  <span style={{ fontWeight: 700 }}>{requiredNetwork}</span>. Please switch in your Lace / Midnight
                  wallet.
                </Typography>
                <Button size="small" variant="outlined" color="error" onClick={() => reconnect()} sx={{ mt: 1.5 }}>
                  Reconnect Wallet
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      )}

      {walletError && (
        <Typography
          variant="body2"
          sx={{
            color: '#f43f5e',
            background: 'rgba(244, 63, 94, 0.08)',
            p: 2,
            borderRadius: '12px',
            border: '1px solid rgba(244, 63, 94, 0.25)',
          }}
        >
          {walletError}
        </Typography>
      )}

      {/* Action Buttons */}
      <Box sx={{ mt: 'auto', pt: 2 }}>
        {connectionStatus === 'connected' ? (
          <Button variant="outlined" color="secondary" fullWidth onClick={disconnectWallet} sx={{ py: 1.2 }}>
            Disconnect Wallet
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={connectWallet}
            disabled={connectionStatus === 'connecting'}
            sx={{ py: 1.4 }}
          >
            {connectionStatus === 'connecting' ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={18} color="inherit" />
                <span>Connecting Wallet...</span>
              </Box>
            ) : (
              'Connect Lace / Midnight Wallet'
            )}
          </Button>
        )}
      </Box>
    </Paper>
  );
};
