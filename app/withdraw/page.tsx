'use client';
import { Box, Divider, Typography } from "@mui/material";
import { HeadView } from "../components/HeadView";

export default function WithdrawPage() {
    return (
        <div>
            <HeadView/>
            <Divider sx={{my: 3}}/>
            <Box display="flex" justifyContent="center" mt={4}>
                <Box
                        sx={{
                            width: 656, // 宽度
                            height: 715, // 高度
                            bgcolor: 'rgba(24, 107, 163, 0.43)', // 背景色
                            border: '2px solid #1976d2', // 边框
                            borderRadius: 4, // 圆角，数字为theme.spacing(4)
                            boxShadow: 3, // 阴影
                            p: 2, // 内边距
                        }}
                    >
                        <Typography variant="h2" align="center">Withdraw</Typography>
                        <Typography variant="h5" align="center">Unstake and withdraw your ETH</Typography>

                        
                </Box>    
            </Box>

            
            
        </div>
    );
}