import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    content: string;
    onConfirm: ()=>void;
    onCancel: ()=>void;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
    const { isOpen, title, content, onConfirm, onCancel } = props;

    return (<Dialog open={isOpen} onClose={onCancel}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{content}</DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>取消</Button>
                    <Button onClick={onConfirm} autoFocus color="primary">确定</Button>
                </DialogActions>
            </Dialog>);
}