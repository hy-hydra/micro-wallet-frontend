import * as React from 'react';
import { Grid, Divider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GeneralSetting from 'src/components/molecules/Settings/GeneralSetting';
import SecuritySetting from 'src/components/molecules/Settings/SecuritySetting';
import PersonalSetting from 'src/components/molecules/Settings/PersonalSetting';

export default function UserSettingsLayout() {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Grid mt={5}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>General settings</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Change theme, notification etc...</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider sx={{ width: '100%', px: 5, mb: 2 }} />
                    <GeneralSetting />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Security settings</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Change Password, Enable Two Factor Authentication ...</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider sx={{ width: '100%', px: 5, mb: 2 }} />
                    <SecuritySetting />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider sx={{ width: '100%', px: 5, mb: 2 }} />
                    <PersonalSetting />
                </AccordionDetails>
            </Accordion>
        </Grid>
    );
}
