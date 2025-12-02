import { Box, colors, Typography } from "@mui/material";
interface RectBoxViewProps {
    title: string;
    value: string;
}

export default function RectBoxView({ title, value }: RectBoxViewProps) {
    return (
        <Box
            sx={{
                width: 178, // 宽度
                height: 90, // 高度
                bgcolor: 'white', // 背景色
                borderRadius: 4, // 圆角，数字为theme.spacing(4)
                boxShadow: 3, // 阴影
                p: 2, // 内边距
            }}
        >
            <Typography sx={{fontSize: '0.93rem', color: '#8b8b8b', mt: 0.5}} align="center">{title}</Typography>
            <Typography sx={{fontSize: '1.5rem', color: '#0285c7', fontWeight: 750}} variant="h6" align="center">{value} ETH</Typography>
        </Box>
    )
}