import { useContext } from "react";
import { LoadingContext } from "../../../components/contexts/LoadingContext";
import { Box, LinearProgress } from "@mui/material";

/**
 *  LoadingIndicator.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
export const LoadingIndicator = () => {
    const { loading } = useContext(LoadingContext);

    // creating an overlay effect
    return (loading &&
        <Box sx={{
            zIndex: 2,
            position: 'fixed',
            width: '100%'
        }}>
            <LinearProgress color="primary" />
        </Box>
    )
}