import React, { useCallback, useState } from 'react';
import { Box, Button } from '@mui/material';
import ImageUploading from 'react-images-uploading';
import { ExportInterface, ImageListType, ImageType } from 'react-images-uploading/dist/typings';

import { TWithDisabled } from '@/types/props';

import styles from './SImageUpload.module.scss';

interface IProps {
    initialSrc?: string | null;
    onChange?: (file: string | null) => void;
}

type TProps = TWithDisabled<IProps>;

const SImageUpload: React.FC<TProps> = (props: TProps) => {
    const { initialSrc, onChange, disabled } = props;

    const [imageValue, setImageValue] = useState<ImageType[]>([
        {
            dataURL: initialSrc ?? undefined
        }
    ]);

    const handleImageChange = useCallback(
        (imageList: ImageListType) => {
            setImageValue([imageList[0]]);
            onChange?.(imageList[0]?.dataURL ?? null);
        },
        [onChange]
    );

    return (
        <ImageUploading value={imageValue} onChange={handleImageChange} inputProps={{ disabled }}>
            {({ imageList, dragProps, onImageUpload, isDragging }: ExportInterface) => (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="100%"
                >
                    <Button
                        {...dragProps}
                        onClick={onImageUpload}
                        disabled={disabled}
                        sx={{
                            position: 'absolute',
                            zIndex: 2,
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%'
                        }}
                        variant={isDragging ? 'contained' : 'text'}
                    >
                        {imageValue.length > 0 && !isDragging ? '' : 'Click or drop image'}
                    </Button>
                    <img
                        className={styles.SImageUpload__image}
                        src={imageList[0]?.dataURL}
                        alt="Product image"
                        width="100"
                    />
                </Box>
            )}
        </ImageUploading>
    );
};

export default SImageUpload;
