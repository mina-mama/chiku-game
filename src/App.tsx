import { Box, Link, Stack, Typography } from "@mui/material"

function App() {
    return (
        <Box p={2}>
            <Typography variant="h5">ほーむがめん</Typography>
            <Stack p={2} spacing={1}>
                <Link href="#calc-game" target="_blank">けいさんばとる</Link>
                <Link href="#hiragana-select" target="_blank">ひらがなでげっと（おとがでるようにしてやってね）</Link>
            </Stack>
        </Box>
    )
}

export default App