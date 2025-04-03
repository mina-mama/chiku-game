import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

type You = {
    img: string;
    name: string;
}

// const youList: You[] = [
//     { img: "you1.jpg", name: "れつくうざ" },
//     { img: "you2.jpg", name: "ばさぎり" },
//     { img: "you3.jpg", name: "がらるふあいやあ" },
//     { img: "you4.png", name: "めがめたぐろす" },
//     { img: "you5.png", name: "めたぐろす" },
//     { img: "you6.png", name: "みらいどん" },
//     { img: "you7.png", name: "こらいどん" },
//     { img: "you8.png", name: "そうぶれいず" },
//     { img: "you9.png", name: "このよざる" },
//     { img: "you10.png", name: "ぐれんあるま" },
//     { img: "you11.png", name: "ひとでまん" },
//     { img: "you12.png", name: "すたあみい" },
// ]

const youList: You[] = [
    { img: "game1.png", name: "ようちゆう" },
    { img: "game2.png", name: "かぶとむし" },
    { img: "game3.png", name: "めす" },
    { img: "game4.png", name: "ごほんづのかぶと" },
    { img: "game5.png", name: "こおかさすおおかぶと" },
    { img: "game6.png", name: "へらくれすおおかぶと" },
    { img: "game7.png", name: "ぷりもすまるがたくわがた" },
    { img: "game8.png", name: "にじいろくわがた" },
    { img: "game9.png", name: "おうごんおにくわがた" },
]

const getRandomHiragana = () => {
    const hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ";
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    return hiragana[randomIndex];
}

const getFake = (text: string) => {
    const newFake = getRandomHiragana();
    if (newFake === text) return getFake(text)
    if (newFake === "じ" && text === "ぢ") return getFake(text)
    if (newFake === "ぢ" && text === "じ") return getFake(text)
    if (newFake === "ず" && text === "づ") return getFake(text)
    if (newFake === "づ" && text === "ず") return getFake(text)
    return newFake
}

const heart = {
    "animation": "move-y .5s infinite alternate ease-in-out;",
    "@keyframes move-y": {
        "from": {
            transform: "translateY(0);"
        },
        "to": {
            transform: "translateY(10px);"
        }
    }
}

function HiraganaSelect() {

    const [you, setYou] = useState<You | null>(null);
    const [count, setCount] = useState(0);
    const [process, setProcess] = useState("start")

    const [a, setA] = useState("")
    const [b, setB] = useState("")

    const isReload = useRef(false)

    const uttr = useRef(new SpeechSynthesisUtterance())
    const talk = (text: string) => {
        speechSynthesis.cancel()
        uttr.current.text = text + "ー"
        uttr.current.lang = "ja-JP"
        uttr.current.rate = 1
        uttr.current.volume = 0.9
        speechSynthesis.speak(uttr.current)
    }

    const talkText = (text: string) => {
        speechSynthesis.cancel()
        uttr.current.text = text + "ー"
        uttr.current.lang = "ja-JP"
        uttr.current.rate = 2
        uttr.current.volume = 0.8
        speechSynthesis.speak(uttr.current)
    }

    useEffect(() => {
        if (!isReload.current) {
            const i = Math.floor(Math.random() * youList.length);
            setYou(youList[i]);
            talkText("やせいの" + youList[i].name + "　が　あらわれた。つかまえる？")
            isReload.current = true
        }
    }, [])

    const getEx = () => {
        if (you === null) return
        const i = Math.floor(Math.random() * 2)
        const newA = you?.name.substring(count, count + 1)
        if (i === 0) {
            setA(newA)
            setB(getFake(newA))
        } else {
            setA(getFake(newA))
            setB(newA)
        }
        talk(newA)
    }

    useEffect(() => {
        if (process === "battle") {
            getEx()
        }
        if (process === "failed") {
            talkText("にげられちゃった・・・")
        }
        if (process === "success") {
            talkText("やったああああああ　" + you?.name + "　を　つかまえた")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process])

    const handleTry = (text: string) => () => {
        if (text === you?.name.substring(count, count + 1)) {
            setCount((prev) => prev + 1)
        } else {
            setProcess("failed")
        }
    }

    useEffect(() => {
        if (count === you?.name.length) {
            setProcess("success")
        } else {
            getEx()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    return (
        <Box p={1} width={"100%"} justifyItems={"center"} textAlign="center" >
            {
                process === "start" && you !== null &&
                <Box>
                    <Typography fontSize={35}>やせいの {you.name} が あらわれた</Typography>
                    <img src={import.meta.env.BASE_URL + you.img} height={300} />
                    <Typography fontSize={35} m={2}>つかまえる？</Typography>
                    <Stack direction={"row"} spacing={2} ml="auto" mr="auto">
                        <Button variant='contained' sx={{ fontSize: 35, width: "100%" }}
                            onClick={() => { setProcess("battle") }}
                        > つかまえる</Button>
                        <Button variant='contained' color="error" sx={{ fontSize: 35, width: "100%" }}
                            onClick={() => { window.location.reload() }}
                        > つかまえない</Button>
                    </Stack>
                </Box >
            }
            {
                process === "battle" && you !== null &&
                <Box>
                    <Stack direction={"row"} mb={1} spacing={1} justifyContent={"center"} >
                        {(() => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const hearts: any[] = []
                            for (let i = 0; i < count; i++) {
                                hearts.push(<FavoriteIcon fontSize="large" color="error" />)
                            }
                            for (let i = 0; i < you.name.length - count; i++) {
                                hearts.push(<FavoriteBorderIcon fontSize="large" />)
                            }
                            return hearts
                        })()}
                    </Stack>
                    <img src={import.meta.env.BASE_URL + you.img} height={300} />
                    <Stack direction={"row"} spacing={2} ml="auto" mr="auto">
                        <Button variant='contained' sx={{ fontSize: 50, width: "100%" }}
                            onClick={handleTry(a)}
                        > {a}</Button>
                        <Button variant='contained' sx={{ fontSize: 50, width: "100%" }}
                            onClick={handleTry(b)}
                        > {b}</Button>
                    </Stack>
                    <Button
                        onClick={() => {
                            talk(you?.name.substring(count, count + 1))
                        }}
                        sx={{ mt: 2 }}
                    >もう １かい きく</Button>
                </Box>
            }
            {
                process === "failed" && you !== null &&
                <Box>
                    <Typography fontSize={35}>にげられちゃった・・・</Typography>
                    <Stack direction={"row"} spacing={2} ml="auto" mr="auto" mt={40}>
                        <Button variant='contained' sx={{ fontSize: 35, width: "100%" }}
                            onClick={() => {
                                setProcess("battle")
                                setCount(0)
                            }}
                        > またやる</Button>
                        <Button variant='contained' color="error" sx={{ fontSize: 35, width: "100%" }}
                            onClick={() => { window.location.reload() }}
                        > やらない</Button>
                    </Stack>
                </Box>
            }
            {
                process === "success" && you !== null &&
                <Box>
                    <Stack>
                        <Typography fontSize={35} mb={2}>{you.name} を つかまえた！！！</Typography>
                        <Stack direction={"row"} mb={1} spacing={1} ml="auto" mr="auto" sx={heart}>
                            {(() => {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const hearts: any[] = []
                                for (let i = 0; i < you.name.length; i++) {
                                    hearts.push(<FavoriteIcon fontSize="large" color="error" />)
                                }
                                return hearts
                            })()}
                        </Stack>
                        <Box>
                            <img src={import.meta.env.BASE_URL + you.img} height={300} />
                        </Box>
                        <Button variant='contained' sx={{ fontSize: 50, mt: 3 }}
                            onClick={() => {
                                window.location.reload();
                            }}>
                            またやる
                        </Button>
                    </Stack>
                </Box>
            }
        </Box >
    )
}

export default HiraganaSelect