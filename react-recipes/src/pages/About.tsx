import { Typography, Box, Paper, Button } from '@mui/material';
import { Info as InfoIcon, Group as GroupIcon, Email as EmailIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';

const About = () => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <InfoIcon sx={{ fontSize: 60, color: '#FAD0C4' }} />
        <Typography variant="h2" sx={{ color: '#FAD0C4' }}>About Us</Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 600 }}>
          Welcome to our community! Here, we share amazing content, updates, and insights. By joining, you'll stay 
          informed and connected with like-minded people.
        </Typography>
        
        {/* Icon and Message about Group */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupIcon sx={{ fontSize: 40, color: '#FAD0C4' }} />
          <Typography variant="h6" sx={{ color: '#FAD0C4' }}>Join Our Group</Typography>
        </Box>
        <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 600 }}>
          Be part of something bigger! Join our group to collaborate, share ideas, and grow together. We have exciting 
          opportunities for everyone.
        </Typography>
        
        {/* Icon and Message about Email Updates */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon sx={{ fontSize: 40, color: '#FAD0C4' }} />
          <Typography variant="h6" sx={{ color: '#FAD0C4' }}>Get Email Updates</Typography>
        </Box>
        <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 600 }}>
          Don't miss out on important updates! Subscribe to receive email notifications about new posts, events, and more.
        </Typography>
        
        {/* Icon and Message about Time-Sensitive Information */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTimeIcon sx={{ fontSize: 40, color: '#FAD0C4' }} />
          <Typography variant="h6" sx={{ color: '#FAD0C4' }}>Time-Sensitive Content</Typography>
        </Box>
        <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 600 }}>
          Stay up-to-date with the latest news and offers. Be the first to know about time-sensitive content and exclusive deals.
        </Typography>

        {/* Register Button */}
        <Button 
          variant="contained" 
          sx={{ mt: 3, px: 4, backgroundColor: '#FAD0C4', color: '#000' }} 
          onClick={() => alert('Redirecting to registration page...')}
        >
          Register Now
        </Button>
      </Box>
    </Paper>
  );
};

export default About;
