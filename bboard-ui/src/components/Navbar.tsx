import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import { NavLink } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';

export const Navbar: React.FC = () => {
  const { isConnected, walletAddress } = useWallet();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'My Notes', path: '/notes' },
    { label: 'Deploy Contract', path: '/deploy' },
    { label: 'About', path: '/about' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#38bdf8' : '#94a3b8',
    textDecoration: 'none',
    fontWeight: isActive ? 700 : 500,
    fontSize: '0.95rem',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    position: 'relative' as const,
    padding: '8px 16px',
    borderRadius: '12px',
    background: isActive ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
    border: isActive ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid transparent',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  });

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'rgba(7, 9, 19, 0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '76px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              color: 'inherit',
            }}
            component={NavLink}
            to="/"
          >
            <Box
              sx={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.45)',
              }}
            >
              <LockIcon sx={{ color: '#070913', fontSize: '22px' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                letterSpacing: '0.02em',
                background: 'linear-gradient(90deg, #ffffff 0%, #38bdf8 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.25rem',
              }}
            >
              SECRET NOTES
            </Typography>
          </Box>

          {/* Desktop Nav Items */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} style={navLinkStyle}>
                  {item.label}
                </NavLink>
              ))}
            </Box>
          )}

          {/* Desktop Wallet Button / Mobile Menu Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isConnected && !isMobile && (
              <Box
                sx={{
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '14px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.2,
                  boxShadow: '0 0 15px rgba(56, 189, 248, 0.15)',
                }}
              >
                <Box
                  sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#34d399',
                    boxShadow: '0 0 10px #34d399',
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: '"Space Grotesk", monospace',
                    fontWeight: 700,
                    color: '#38bdf8',
                    letterSpacing: '0.05em',
                  }}
                >
                  {walletAddress
                    ? `${walletAddress.substring(0, 8)}...${walletAddress.substring(walletAddress.length - 8)}`
                    : 'Connected'}
                </Typography>
              </Box>
            )}

            {isMobile ? (
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: '#38bdf8' }} />
              </IconButton>
            ) : null}
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              background: 'rgba(7, 9, 19, 0.95)',
              borderLeft: '1px solid rgba(56, 189, 248, 0.2)',
              backdropFilter: 'blur(24px)',
            },
          },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, mb: 3, color: '#38bdf8' }}>
            Navigation
          </Typography>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton component={NavLink} to={item.path} sx={{ borderRadius: '12px', mb: 1.5 }}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
