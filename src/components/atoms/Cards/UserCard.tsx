// material-ui
import { Avatar, Grid, Typography, Card, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import TagIcon from '@mui/icons-material/Tag';
// project imports

// assets

import UserCardSkeleton from '../SkeletonCards/UserCardSkeleton';
import IconLabel from '../IconLabel';
import useAuth from 'src/hooks/useAuth';
import { useSelector } from 'src/store';

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

interface UserCardProps {
    isLoading: boolean;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""'
        }
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0
        }
    }
}));

const UserCard = ({ isLoading }: UserCardProps) => {
    const { user } = useAuth();
    const { userTokenList } = useSelector((state) => state.token);

    const getTotalPrice = () => {
        let totalPrice = 0;
        userTokenList.forEach((token) => {
            totalPrice += token.sell_price * token.balance;
        });

        return totalPrice?.toFixed(5);
    };

    return (
        <>
            {!user || isLoading ? (
                <UserCardSkeleton />
            ) : (
                <Card className="user-card">
                    <Grid sx={{ width: '100%' }} container>
                        <Grid item sm={6} xs={12} className={'flex align-center justify-center'}>
                            <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                                <Avatar alt="Remy Sharp" src="assets/images/avatar/lovely.jpg" sx={{ width: 60, height: 60 }} />
                            </StyledBadge>
                            <Stack direction={'column'} ml={2}>
                                <IconLabel icon={<PersonPinIcon />} label={user.username} />
                                <IconLabel icon={<MarkunreadIcon />} label={user.email} />
                                <IconLabel icon={<TagIcon />} label={`ID: ${user.id}`} />
                            </Stack>
                        </Grid>
                        <Grid
                            container
                            item
                            sm={6}
                            xs={12}
                            sx={{
                                mt: { md: 0, xs: 2 },
                                textAlign: 'center',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography sx={{ fontWeight: 600 }}>Total Balance</Typography>
                            <Typography className="balance-font" sx={{ fontWeight: 600, fontSize: 28 }}>
                                {getTotalPrice()}
                                <span style={{ fontSize: 22, fontWeight: 600, marginLeft: 2 }}>USD</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            )}
        </>
    );
};

export default UserCard;
