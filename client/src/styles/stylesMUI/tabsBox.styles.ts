import { SxProps } from "@mui/material";

export const tabsBoxStyles: SxProps = {
    display: "flex",
    flexDirection: 'row', 
    justifyContent: "space-between",
    alignItems: "center", 
    width: "100%",
    gap: { xs: '10px', md: '0' },
    '& > *:nth-child(2)': { 
        marginBottom: { xs: '10px', md: '5px' } 
    },
    '@media (max-width: 900px)': {
        flexDirection: 'column', 
    },
};