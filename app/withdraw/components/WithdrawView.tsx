import { Box, Button, Grid, Stack, Typography } from "@mui/material";

interface WithdrawViewProps {
    amount?: string;
}

export default function WithdrawView({ amount }: WithdrawViewProps) {
    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    }

    const onClickWithdraw = () => {
        // Add withdraw logic here
    };

    return (
        <div style={{ marginTop: 40 }}>
            <Typography variant="h5">Withdraw</Typography>

            <Box
                sx={{
                    margin: '1rem',
                    width: 578, // 宽度
                    height: 90, // 高度
                    bgcolor: '#f3faff', // 背景色
                    borderRadius: 2, // 圆角，数字为theme.spacing(4)
                    boxShadow: 3, // 阴影
                    p: 2, // 内边距
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Stack spacing={0.5}>
                    <Typography sx={{fontSize: '0.93rem', color: '#8b8b8b'}} align="left">Ready to Withdraw</Typography>
                    <Typography sx={{fontSize: '1.5rem', color: '#0285c7', fontWeight: 750}} variant="h6">
                        {amount || "0.0000"} ETH
                    </Typography>

                    
                </Stack>

                <Typography sx={{fontSize: '0.93rem', color: '#8b8b8b', mt: 0.5}} display="flex" alignItems="center">20 minutes cooldown</Typography>
            </Box>

            <Typography sx={{margin: '1rem', fontSize: '0.93rem', color: '#8b8b8b', mt: 0.5}}>After unstaking, you need to wait 20 minutes to withdraw.</Typography>

            <Button onClick={onClickWithdraw} style={{margin: '1rem 1rem', height:'50px', width: '578px', fontSize: '20px'}} variant="contained" >
                Withdraw ETH
            </Button>


        </div>
    );  
}