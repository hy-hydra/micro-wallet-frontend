import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography } from '@mui/material';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';

export default function CsvDownloadButton({ csvData }: { csvData: any }) {
    return (
        <PrimaryOutlineButton variant="outlined">
            <CSVLink data={csvData} className="csv-link">
                <Typography display={'flex'} alignItems={'center'}>
                    Download
                    <DownloadIcon />
                </Typography>
            </CSVLink>
        </PrimaryOutlineButton>
    );
}
