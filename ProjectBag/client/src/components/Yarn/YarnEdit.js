import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editYarn, getYarnById } from "../../APIManagers/YarnManager"
import "./Form.css"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { getAllFibers } from "../../APIManagers/FiberManager";
import { getAllWeights } from "../../APIManagers/WeightManager";
import narrowlogo from '../Nav/narrowlogo.png'
import Card from '@mui/material/Card';



export const YarnEdit = () => {
    const navigate = useNavigate()
    const { yarnId } = useParams();
    const [weights, setWeights] = useState([])
    const [fibers, setFibers] = useState([])
    const getFibers = () => {
        getAllFibers().then(allFibers => setFibers(allFibers));
    }
    const getWeights = () => {
        getAllWeights().then(allWeights => setWeights(allWeights));
    }

    useEffect(() => {
        getFibers()
        getWeights()
    }, [])


    const [yarn, update] = useState({
        brand: "",
        color: "",
        quantity: "",
        yarnUrl: "",
        fiberId: 0,
        weightId: 0,
        userId: 0

    })
    useEffect(() => {
        getYarnById(yarnId)
            .then((yarns) => {
                update(yarns)
            })
    }, [yarnId]);

    const handleSave = (event) => {
        event.preventDefault()

        const yarnToEdit = {
            Id: parseInt(yarnId),
            Brand: yarn.brand,
            Color: yarn.color,
            Quantity: yarn.quantity,
            YarnUrl: yarn.yarnUrl,
            FiberId: yarn.fiberId,
            WeightId: yarn.weightId

        }


        return editYarn(yarnToEdit).then(navigate(`/yarn`))
    }
    //I've found this method to be very useful when needing to select an item then add it to the database
    const selectListFiber = (event) => {
        const copy = {
            ...yarn
        }
        copy.fiberId = event.target.value
        update(copy)
    }

    const selectListWeight = (event) => {
        const copy = {
            ...yarn
        }
        copy.weightId = event.target.value
        update(copy)
    }

    const theme = createTheme({
        palette: {
            light: '#0494AD',
            main: '#00768B',
            dark: '#015362',

            background: {
                default: '#F2EEE3',
            },

            secondary: {
                main: "#00768B"
            }
        }
    });
    return (<>
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box
                sx={{
                    bgcolor: '#F2EEE3',
                    pt: 8,
                    pb: 6,
                }}

                display='flex'
                alignItems='center'
                justify='center'
            >
                <Container >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "center"
                        }}
                    >
                        <img
                            alt='Project Bag logo'
                            src={narrowlogo}
                            width={800}
                            align='center'

                        />
                    </Box>
               
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    > <Typography variant="h5" align="center" color="#545454" paragraph>
                        Edit Your {yarn.color} {yarn.brand} Yarn
                    </Typography>

                    </Stack>
                    </Container>
            </Box>
         
            <Box
                sx={{
                    justifyContent: "center",
                    display: "flex"
                }}
            >
                <Card sx={{ bgcolor: '#F2EEE3', marginBottom: 10, padding: 5 }} bgcolor="#545454" >
                    <form style={{ width: 600, }}>
                        <Typography variant="h6" align="center" color="#545454" paragraph>

                            Fill out this form to edit your yarn details.
                        </Typography>
                        < fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Brand:  </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={yarn.brand}
                            onChange={
                                (event) => {
                                    const copy = { ...yarn }
                                    copy.brand = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Colorway: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={yarn.color}
                            onChange={
                                (event) => {
                                    const copy = { ...yarn }
                                    copy.color = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Add a Photo Url:  </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={yarn.yarnUrl}
                            onChange={
                                (event) => {
                                    const copy = { ...yarn }
                                    copy.yarnUrl = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Quantity:  </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={yarn.quantity}
                            onChange={
                                (event) => {
                                    const copy = { ...yarn }
                                    copy.quantity = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="fiber-select">Yarn Fiber Type </label>
                        {/* Select that category from the list!! */}
                        <select id="type"
                            value={
                                yarn.fiberId
                            }
                            onChange={
                                event => selectListFiber(event)
                            }>
                            <option value="0">Select the Fiber Type </option>
                            {
                                fibers.map(fiber => {
                                    return <option value={fiber.id} key={
                                        fiber.id
                                    }>
                                        {
                                            fiber.name
                                        }</option>
                                })
                            } </select>
                    </div>
                </fieldset>


                <fieldset>
                    <div className="form-group">
                        <label htmlFor="weight-select">Yarn Weight </label>
                        {/* Select that category from the list!! */}
                        <select id="type"
                            value={
                                yarn.weightId
                            }
                            onChange={
                                event => selectListWeight(event)
                            }>
                            <option value="0">Select the Yarn Weight </option>
                            {
                                weights.map(weight => {
                                    return <option value={weight.id} key={
                                        weight.id
                                    }>
                                        {
                                            weight.name
                                        }</option>
                                })
                            } </select>
                    </div>
                </fieldset>
                <Button variant="contained" color='secondary' onClick={(clickEvent) => handleSave(clickEvent)} >
                    Save
                </Button>
                </form>     
                </Card>
            </Box>
               </ThemeProvider>
    </>
    )
}