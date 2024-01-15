import React, { useCallback, useMemo } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { IProduct } from '@/store/products/types';
import { TWithLoading } from '@/types/props';

import { isEqual } from '@/helpers/isEqual';

import SImageUpload from '@/ui/SImageUpload/SImageUpload';

import SDelete from '@/components/SDelete/SDelete';

interface IProps {
    initialProduct?: IProduct;
    onSave: (event: TFormikValues) => void;
    onDelete?: () => void;
}

type TProps = TWithLoading<IProps>;

export type TFormikValues = Partial<Omit<IProduct, 'id' | 'isExternalCreate'>>;

const SProductDetail: React.FC<TProps> = (props: TProps) => {
    const { initialProduct, onSave, isLoading, onDelete } = props;

    const formik = useFormik<TFormikValues>({
        initialValues: initialProduct ?? {
            price: 0,
            isPublished: false,
            title: '',
            description: '',
            image: ''
        },
        onSubmit: onSave,
        validationSchema: Yup.object({
            price: Yup.number().min(0, 'Только положительное значение').required('Обязательное поле'),
            title: Yup.string().strict(true).required('Обязательное поле'),
            description: Yup.string().strict(true).required('Обязательное поле')
        })
    });

    const isValuesEqual = useMemo(() => isEqual(formik.values, initialProduct ?? {}), [formik.values, initialProduct]);

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            formik.handleSubmit(event);
        },
        [formik]
    );

    const getFormikFields = useCallback(
        (field: keyof TFormikValues) => ({
            name: field,
            value: formik.values[field],
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            error: formik.touched[field] && Boolean(formik.errors[field]),
            helperText: formik.touched[field] && (formik.errors[field] as string)
        }),
        [formik.errors, formik.handleBlur, formik.handleChange, formik.touched, formik.values]
    );

    const handleImageChange = useCallback(
        (uploadedImage: string | null) => {
            formik.setFieldValue('image', uploadedImage);
        },
        [formik]
    );

    return (
        <Box display="flex" flexDirection="column" gap="20px" component="form" onSubmit={handleSubmit}>
            <Grid container width="100%" spacing={2}>
                <Grid item xs={4} xl={4} md={4} height="300px">
                    <SImageUpload
                        initialSrc={initialProduct?.image}
                        onChange={handleImageChange}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item xs={8} xl={8} md={8}>
                    <Box display="flex" flexDirection="column" gap="20px">
                        <FormControlLabel
                            label="Опубликовано"
                            name="isPublished"
                            disabled={isLoading}
                            control={<Checkbox checked={formik.values.isPublished} onChange={formik.handleChange} />}
                        />
                        <TextField label="Название" disabled={isLoading} fullWidth {...getFormikFields('title')} />
                        <TextField label="Цена" disabled={isLoading} fullWidth {...getFormikFields('price')} />
                        <TextField
                            label="Описание"
                            disabled={isLoading}
                            fullWidth
                            {...getFormikFields('description')}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid item xs={12} md={12} xl={5} alignSelf="flex-end">
                <Box alignItems="center" gap="20px" display="flex">
                    <Button type="submit" variant="contained" color="success" disabled={isValuesEqual || isLoading}>
                        Сохранить
                    </Button>

                    {onDelete && <SDelete onConfirm={onDelete} disabled={isLoading} />}
                </Box>
            </Grid>
        </Box>
    );
};

export default SProductDetail;
