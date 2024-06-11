import { Fragment } from 'react';

// material-ui
import { Grid, CardHeader, Typography, Box, Tooltip } from '@mui/material';
import CardMui from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

// third-party
import { TreeNode, Tree } from 'react-organizational-chart';

// project imports
import { TreeCardmiddleWare, TreeMiddleWare } from 'src/types/org-chart';
import { LightTooltip } from 'src/components/atoms/StyledComponent';

// ==============================|| ORGANIZATION CHARTS ||============================== //

const data = [
    {
        name: 'Anne Teak',
        date: '2021/2/8',
        avatar: 'https://i.pravatar.cc/100?img=3',
        email: 'anne@gmail.com',
        children: [
            {
                name: 'Colin Sik',
                date: '2021/2/8',
                avatar: 'https://i.pravatar.cc/100?img=1',
                email: 'test@gmail.com',
                children: [
                    {
                        name: 'Karen Onnabit',
                        date: '2021/2/8',
                        avatar: 'https://i.pravatar.cc/100?img=2',
                        email: 'anne@gmail.com'
                    }
                ]
            },
            {
                name: 'Jen Tile',
                date: '2021/2/8',
                avatar: 'https://i.pravatar.cc/100?img=4',
                email: 'anne@gmail.com',

                children: [
                    {
                        name: 'Anne Thurium',
                        date: '2021/2/8',
                        avatar: 'https://i.pravatar.cc/100?img=5',
                        email: 'anne@gmail.com',

                        children: [
                            {
                                name: 'Liz Erd',
                                date: '2021/2/8',
                                avatar: 'https://i.pravatar.cc/100?img=6',
                                email: 'anne@gmail.com'
                            },
                            {
                                name: 'Percy Vere',
                                date: '2021/2/8',
                                avatar: 'https://i.pravatar.cc/100?img=7',
                                email: 'anne@gmail.com'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Harriet Upp',
                date: '2021/2/8',
                avatar: 'https://i.pravatar.cc/100?img=8',
                email: 'anne@gmail.com',

                children: [
                    {
                        name: 'Mark Ateer',
                        date: '2021/2/8',
                        avatar: 'https://i.pravatar.cc/100?img=6',
                        email: 'anne@gmail.com'
                    },
                    {
                        name: 'Dave Allippa',
                        date: '2021/2/8',
                        avatar: 'https://i.pravatar.cc/100?img=7',
                        email: 'anne@gmail.com'
                    }
                ]
            }
        ]
    }
];

function SimpleTree(props: TreeMiddleWare) {
    const { name, email, date, avatar } = props;
    const theme = useTheme();

    return (
        <Box
            sx={{
                border: `1px solid ${theme.palette.secondary.dark}`,
                width: 'max-content',
                bgcolor: '#fff',
                p: 1,
                m: 'auto',
                color: theme.palette.primary.dark,
                borderRadius: 1,
                '&>p': {
                    fontSize: '12px'
                }
            }}
        >
            <Typography>{date}</Typography>
            <LightTooltip title={email}>
                <Typography>{name}</Typography>
            </LightTooltip>
        </Box>
    );
}

function TreeCard({ items }: TreeCardmiddleWare) {
    return (
        <>
            {items.map((item: any, id: any) => (
                <Fragment key={id}>
                    {item.children ? (
                        <TreeNode label={<SimpleTree {...item} />}>
                            <TreeCard items={item.children} />
                        </TreeNode>
                    ) : (
                        <TreeNode label={<SimpleTree {...item} />} />
                    )}
                </Fragment>
            ))}
        </>
    );
}

const OrgChartPage = () => {
    const theme = useTheme();

    return (
        <Grid container rowSpacing={2} justifyContent="center">
            <Grid item md={12} lg={12} xs={12}>
                <CardMui sx={{ padding: 4, overflowY: 'auto', maxHeight: '100vh' }}>
                    <CardHeader title="Referral Tree Chart" />
                    <Grid item md={12} lg={12} xs={12}>
                        <Tree
                            lineWidth="1px"
                            lineColor={theme.palette.primary.main}
                            lineBorderRadius="10px"
                            label={<SimpleTree {...data[0]} />}
                        >
                            <TreeCard items={data[0].children} />
                        </Tree>
                    </Grid>
                </CardMui>
            </Grid>
        </Grid>
    );
};

export default OrgChartPage;
