import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Syne", "Plus Jakarta Sans", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontFamily: '"Syne", "Plus Jakarta Sans", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontFamily: '"Syne", "Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontFamily: '"Syne", "Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h5: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    allVariants: {
      color: '#f8fafc',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#38bdf8', // Neon Sky Blue / Cyan
      light: '#7dd3fc',
      dark: '#0284c7',
      contrastText: '#0f172a',
    },
    secondary: {
      main: '#c084fc', // Vibrant Purple / Violet
      light: '#e9d5ff',
      dark: '#9333ea',
      contrastText: '#ffffff',
    },
    info: {
      main: '#2dd4bf', // Emerald Teal
      light: '#5eead4',
      dark: '#0d9488',
    },
    warning: {
      main: '#fbbf24', // Amber
    },
    success: {
      main: '#34d399', // Mint Green
    },
    error: {
      main: '#f43f5e', // Neon Rose
    },
    background: {
      default: '#070913', // Ultra-deep Slate Midnight
      paper: 'rgba(15, 23, 42, 0.65)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#070913',
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(56, 189, 248, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 85% 85%, rgba(192, 132, 252, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.05) 0%, transparent 60%)
          `,
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          color: '#f8fafc',
          overflowX: 'hidden',
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#070913',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(56, 189, 248, 0.25)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(56, 189, 248, 0.45)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(56, 189, 248, 0.12)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'rgba(56, 189, 248, 0.35)',
            boxShadow: '0 12px 40px rgba(56, 189, 248, 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '0.95rem',
          padding: '12px 28px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          letterSpacing: '0.01em',
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
            color: '#070913',
            boxShadow: '0 4px 20px rgba(56, 189, 248, 0.35)',
            border: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #7dd3fc 0%, #a5b4fc 50%, #e9d5ff 100%)',
              boxShadow: '0 6px 28px rgba(56, 189, 248, 0.55)',
              transform: 'translateY(-2px) scale(1.01)',
            },
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: 'rgba(56, 189, 248, 0.4)',
            color: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.05)',
            '&:hover': {
              borderColor: '#38bdf8',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              boxShadow: '0 4px 20px rgba(56, 189, 248, 0.25)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          fontWeight: 600,
          fontFamily: '"Space Grotesk", sans-serif',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '14px',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            transition: 'all 0.3s ease',
            color: '#f8fafc',
            '& fieldset': {
              border: 'none',
            },
            '&:hover': {
              border: '1px solid rgba(56, 189, 248, 0.4)',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.1)',
            },
            '&.Mui-focused': {
              border: '1px solid #38bdf8',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)',
            },
          },
        },
      },
    },
  },
});
