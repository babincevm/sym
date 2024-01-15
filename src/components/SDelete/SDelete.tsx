import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TWithDisabled } from '@/types/props';

interface IProps {
    onConfirm: () => void;
}

type TProps = TWithDisabled<IProps>;

const SDelete: React.FC<TProps> = (props: TProps) => {
    const { disabled, onConfirm } = props;
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    const handleDeleteClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsDeleteConfirmationOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setIsDeleteConfirmationOpen(false);
    }, [disabled]);

    return (
        <>
            <Button size="medium" variant="contained" onClick={handleDeleteClick} color="error">
                <DeleteIcon aria-label="delete" />
            </Button>

            <Dialog open={isDeleteConfirmationOpen} keepMounted={false} onClose={handleClose}>
                <DialogTitle>Удалить?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" disabled={disabled}>
                        Нет
                    </Button>
                    <Button onClick={onConfirm} color="error" variant="contained" disabled={disabled}>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SDelete;
