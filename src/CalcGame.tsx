import { useEffect, useState } from 'react'
import { Box, Button, colors, Grid, LinearProgress, Stack, TextField, Tooltip, Typography } from '@mui/material';

// const Database = require('better-sqlite3');

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max) + 1;
}

// const youList = ["you1.jpg", "you2.jpg", "you3.jpg", "you4.png", "you5.png", "you6.png", "you7.png", "you8.png", "you9.png"]
// const enemyList = ["enemy1.jpg", "enemy2.jpg", "enemy3.png", "enemy4.png", "enemy5.png", "enemy6.png", "enemy7.png", "enemy8.png"]

// const youList = ["mushi-y1.jpg", "mushi-y2.jpg", "mushi-y3.jpg", "mushi-y4.jpg"]
// const enemyList = ["mushi-e1.jpg", "mushi-e2.jpg", "mushi-e3.jpg", "mushi-e4.jpg"]

const attack = {
  "animation": "move-y .1s infinite alternate ease-in-out;",
  "@keyframes move-y": {
    "from": {
      transform: "translateY(0);"
    },
    "to": {
      transform: "translateY(10px);"
    }
  }
}

const bigAttack = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "red",
  "animation": "color-c .1s infinite alternate ease-in-out;",
  "@keyframes color-c": {
    "from": {
      opacity: 0
    },
    "to": {
      opacity: 1
    }
  }
}

const isEasy = (a: number, b: number) => {
  return (a + b) < 6
}

const isHard = (a: number, b: number) => {
  return a !== 0 && b !== 0 && (a > 5 || b > 5)
}

function CalcGame() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [answer, setAnswer] = useState(0)

  const [enemyDamage, setEnemyDamage] = useState(100)
  const [youDamage, setYouDamage] = useState(100)
  const [input, setInput] = useState("")
  const [isClosed, setIsClosed] = useState(false)

  const [youImg, setYouImg] = useState("")
  const [enemyImg, setEnemyImg] = useState("")

  const [isYouAttack, setIsYouAttack] = useState(false)
  const [isEnemyAttack, setIsEnemyAttack] = useState(false)

  const [isBigAttack, setIsBigAttack] = useState(false)
  const [tooltipTitle, setTooltipTitle] = useState("")

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const db = useRef<any>(null)
  // useEffect(()=>{
  //   (async () => {
  //     // open the database
  //     console.log(1)
  //     db.current = new Database(':memory:');
  //     console.log(2)
  //     await db.current.exec('INSERT INTO user (id, name, level) VALUES ("1","test","1")')
  //   })()
  // },[])


  useEffect(() => {
    // setYouImg(youList[getRandomInt(youList.length) - 1])
    // setEnemyImg(enemyList[getRandomInt(enemyList.length) - 1])
    setYouImg(`game${getRandomInt(9)}.png`)
    setEnemyImg(`game${getRandomInt(9)}.png`)
    calc()
  }, [])

  const calc = () => {
    const newAnswer = getRandomInt(9)
    const newA = getRandomInt(newAnswer)
    const newB = newAnswer - newA
    setAnswer(newAnswer)
    setA(newA)
    setB(newB)
    if (isHard(newA, newB)) {
      setTooltipTitle("これに せいかいしたら、たくさん だめーじを あたえられるぞ！")
    } else if (isEasy(newA, newB)) {
      setTooltipTitle("これを まちがえたら、たくさん だめーじを うけるぞ！")
    } else {
      setTooltipTitle("")
    }
  }

  useEffect(() => {
    if (enemyDamage <= 0 || youDamage <= 0) {
      setTimeout(() => {
        setIsClosed(true)
      }, 1000)
    }
  }, [enemyDamage, youDamage])

  useEffect(() => {
    if (isYouAttack || isEnemyAttack) {
      setTimeout(() => {
        setIsYouAttack(false)
        setIsEnemyAttack(false)
        setIsBigAttack(false)
      }, 800)
    }
  }, [isYouAttack, isEnemyAttack])

  return (
    <>
      {isClosed ?
        <Box p={1} width={"100%"} justifyItems={"center"} textAlign="center">
          <Typography fontSize={50} pb={2}>{enemyDamage <= 0 ? "きみ" : "てき"} の かち</Typography>
          <Box pb={3}>
            {/* {enemyDamage <= 0 ? <img src={"/" + youImg} height={300} /> : <img src={"/" + enemyImg} height={300} />} */}
            {enemyDamage <= 0
              ? <img src={import.meta.env.BASE_URL + youImg} height={300} style={{ transform: "scale(-1, 1)" }} />
              : <img src={import.meta.env.BASE_URL + enemyImg} height={300} />
            }
          </Box>
          <Button variant='contained' sx={{ fontSize: 80 }}
            onClick={() => {
              window.location.reload();
            }}>
            またやる
          </Button>
        </Box>
        :
        <Box p={1} width={"100%"} justifyItems={"center"}>
          <Stack direction={"row"}>
            <Box p={1}>
              <Typography fontSize={50}>きみ</Typography>
              <Box width={500}>
                <LinearProgress variant="determinate" value={youDamage} sx={{ height: 30 }} />
              </Box>
              <Box width={"100%"}>
                <Box sx={[{
                  textAlign: "right",
                  position: "relative",
                }, isYouAttack ? attack : null]}>
                  {/* <img src={"/" + youImg} height={200} /> */}
                  <img src={import.meta.env.BASE_URL + youImg} height={200} style={{ transform: "scale(-1, 1)" }} />
                  <Box sx={isBigAttack && isYouAttack ? bigAttack : null} />
                </Box>
              </Box>
            </Box>
            <Box p={1}>
              <Typography fontSize={50}>てき</Typography>
              <Box width={500}>
                <LinearProgress variant="determinate" value={enemyDamage} sx={{ height: 30 }} />
              </Box>
              <Box sx={[isEnemyAttack ? attack : null, { position: "relative" }]}>
                <img src={import.meta.env.BASE_URL + enemyImg} height={200} />
                <Box sx={isBigAttack && isEnemyAttack ? bigAttack : null} />
              </Box>
            </Box>
          </Stack>
          <Box width={"100%"} p={1} textAlign={"center"}>
            <Stack direction={'row'} justifyContent={"center"} alignItems={"center"} spacing={2}>
              <Tooltip
                open={tooltipTitle !== ""}
                title={
                  <Box>
                    {tooltipTitle}
                  </Box>
                }
                arrow
                placement='top'
                slotProps={{
                  tooltip: {
                    sx: {
                      bgcolor: colors.common.white,
                      color: colors.common.black,
                      fontSize: 30,
                      padding: 2,
                      maxWidth: 450,
                      minWidth: 450,
                      borderRadius: 5,
                      boxShadow: (theme) => theme.shadows[10],
                      "& .MuiTooltip-arrow": {
                        color: colors.common.white,
                      }
                    }
                  }
                }}
              >
                <Stack direction={'row'} justifyContent={"center"} alignItems={"center"} spacing={2} minWidth={"50%"}>
                  <Typography fontSize={100}>{a} + {b} = </Typography>
                  <TextField value={input} slotProps={{ htmlInput: { sx: { fontSize: 100, width: 116, textAlign: "center" } } }}
                  // onChange={(e)=> {setInput(e.target.value)}}
                  />
                </Stack>
              </Tooltip>
              <Box p={2}>
                <Grid container spacing={2} pr={4}>
                  {
                    [7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((value) => (
                      <Grid size={4} key={value}>
                        <Button variant='contained'
                          sx={{ fontSize: 35, width: "100%" }}
                          onClick={() => setInput(value.toString())}>{value}
                        </Button>
                      </Grid>
                    ))
                  }
                  <Grid size={8}>
                    <Button variant='contained' sx={{ fontSize: 35, width: "100%" }}
                      disabled={input === ""}
                      onClick={() => {
                        console.log(Number(input))
                        console.log(Number(answer))
                        if (Number(input) === answer) {
                          if (isHard(a, b)) {
                            setEnemyDamage((prev) => prev - 40)
                            setIsBigAttack(true)
                          } else {
                            setEnemyDamage((prev) => prev - 20)
                          }
                          setIsEnemyAttack(true)
                          setIsYouAttack(false)
                        } else {
                          if (isEasy(a, b)) {
                            setYouDamage((prev) => prev - 40)
                            setIsBigAttack(true)
                          } else {
                            setYouDamage((prev) => prev - 20)
                          }
                          setIsEnemyAttack(false)
                          setIsYouAttack(true)
                        }
                        setInput("")
                        calc()
                      }}>
                      こうげき
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Box>
        </Box>
      }
    </>
  )
}

export default CalcGame
