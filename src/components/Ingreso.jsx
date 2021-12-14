import React, { useEffect, useState } from "react";
import '../App.css';
import './Ingreso.css';
import { Link } from 'react-router-dom';
import { Button, Container, Col, Row, Form } from "react-bootstrap";
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

function Ingreso(props){
   
    const [username, setName] = useState(window.sessionStorage.getItem('userName'))
    const [token, setToken] = useState(window.sessionStorage.getItem('jwt'))
    const [id, setId] = useState(0)
    const [newProduct, setProductValues] = useState({
        code: '',
        name: '',
        cat: '',
        fab: '',
        model: '',
        ver: '',
        year: '',
        ubicacion: '',
        origen: '',
        nota: '',
        price: '',
        critic: '',
        stock: ''
     });


    const loadId = async () =>{
        const userId = await axios.get('http://localhost:8000/api/users/'+username,
            { headers: {"Authorization" : `Token ${token}`} }).then(response => {
            console.log(response.data.id)
            return response.data.id
         }).catch(error => {
            console.log(error.response.data.error)
         })
         setId(userId)
    }

    useEffect(() => {
        loadId()
    },[]);
    useEffect(() => {
    }, id);

    const getProduct = async (e) =>{
        //let noRepetido = true
        const response = await axios.get('http://localhost:8000/api/products/code/'+e.code,{}).then(response => {
            //console.log(response.data.data)
            return response.data.data
         })
         .then(data => {
            //console.log("PRODUCTO CON CODIGO YA EXISTENTE")
            alert("PRODUCTO CON CODIGO YA EXISTENTE")
            //console.log(data)
            //setProductValues(data.data)
         })
         .catch(error => {
            //console.log(error.response.data.error)
            //console.log("PRODUCTO INGRESADO")
            axios.post('http://localhost:8000/api/products/',{
                    code: e.code,
                    name: e.name,
                    cat: e.cat,
                    fab: e.fab,
                    model: e.model,
                    ver: e.ver,
                    year: e.year,
                    ubicacion: e.ubicacion,
                    origen: e.origen,
                    nota: e.nota,
                    price: e.price,
                    critic: e.critic,
                    stock: e.stock,
                    updated_by: id,
                    created_by: id
                }).then(response =>{
                    console.log(response)
                    alert("PRODUCTO INGRESADO")
                })
         })

    }

    const schema = yup.object().shape({
        code: yup.string().matches(/^([0-9]{4})$/, {message: "Respetar Formato Codigo", excludeEmptyString: false}).required('Debe Ingresar Código del Producto'),
        name: yup.string().required('Debe Ingresar Nombre del Producto'),
        cat: yup.string().required('Debe Seleccionar Categoría del Producto'),
        fab: yup.string(),
        model: yup.string(),
        ver: yup.string(),
        year: yup.string().min(4,'Mínimo debe ingresar un año').max(9, 'Formato de Fechas Incorrecto').matches(/^(19|20)\d{2}|^(19|20)\d{2}-(19|20)\d{2}$/, {message: "Porfavor Respetar Formato.", excludeEmptyString: false}).test(
            'años en orden', 'El año menor va primero', function(value){
                if(value){
                    if(value.length>4){
                        return parseInt(value.substring(0, 4)) < parseInt(value.substring(5, 9))
                    }else return true
                }
            }
        ),
        ubicacion: yup.string().required('Debe Seleccionar una Ubicación'),
        origen: yup.string(),
        nota: yup.string(),
        price: yup.number().required('Debe Ingresar Precio Producto'),
        critic: yup.number().required('Debe Ingresar Valor Crítico'),
        stock: yup.number().required('Debe Ingresar Nivel de Stock'),
        isCorrect: yup.bool().required().oneOf([true], 'Debe confirmar la información'),
      });

    return (
        
        <div className="inputContainer">
            <div class = 'row-s'>
                <div class = 'col-s'><div className = "usr-cont">Vendedor: {username}</div></div>
                <div class = 'col-s'><div className = "shop-til">Ingresar Productos</div></div>
                <div class = 'col-s'></div>
            </div>
            <div className="space-input">
                <div className="formCont">
                <Formik
                    validationSchema={schema}
                    //onSubmit={console.log}
                    initialValues={{
                        code: '',
                        name: '',
                        cat: '',
                        fab: '',
                        model: '',
                        ver: '',
                        year: '',
                        ubicacion: '',
                        origen: '',
                        nota: '',
                        price: '',
                        critic: '',
                        stock: '',
                        isCorrect: false,
                    }}
                    //validateOnChange={false}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                          //alert(JSON.stringify(values, null, 2));
                          console.log(values)
                          //console.log(newProduct)
                          /*if (getProduct(values.code)){
                              alert("PRODUCTO CON ESE CODIGO YA EXISTE")
                          }
                          else{
                              alert("producto ingresado")
                          }*/
                          
                          getProduct(values)

                          actions.setSubmitting(false);
                          actions.resetForm();
                        }, 200);
                        
                    }}
                >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    resetForm,
                    values,
                    isValid,
                    errors,
                }) => (
                    <Form id = "input-form" noValidate onSubmit={handleSubmit}>
                        <Container>
                            <Row className="ib-3">
                                <Form.Group as={Col} md = "3" controlId="formGridCode">
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese Código Producto"
                                    name = "code" 
                                    value={values.code} 
                                    onChange={handleChange}
                                    //isValid={touched.code && !errors.code}
                                    isInvalid={!!errors.code}
                                />
                                <Form.Control.Feedback type="invalid" tooltip id="pos">
                                    {errors.code}
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Nombre Producto</Form.Label>
                                <Form.Control placeholder="Ingrese Nombre Producto" 
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        //isValid={touched.name && !errors.name}
                                        isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid" tooltip id="pos">
                                    {errors.name}
                                </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="ib-3">
                                <Form.Group as={Col} controlId="formGridCat">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Select aria-label="categorias"
                                    name="cat"
                                    value={values.cat}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.cat}
                                >
                                    <option>Seleccione una Categoria</option>
                                    <option value="Accesorios">Accesorios</option>
                                    <option value="Aceite">Aceite</option>
                                    <option value="Alimentación">Alimentación</option>
                                    <option value="Alternadores">Alternadores</option>
                                    <option value="Balatas Traseras">Balatas Traseras</option>
                                    <option value="Cadenas">Cadenas</option>
                                    <option value="Carroceria">Carroceria</option>
                                    <option value="Catalizadores">Catalizadores</option>
                                    <option value="Correas">Correas</option>
                                    <option value="Dirección">Dirección</option>
                                    <option value="Distribución">Distribución</option>
                                    <option value="Embragues">Embragues</option>
                                    <option value="Eléctrico">Eléctrico</option>
                                    <option value="Empaquetadura Culata">Empaquetadura Culata</option>
                                    <option value="Empaquetadura Válvulas">Empaquetadura Válvulas</option>
                                    <option value="Espejos">Espejos</option>
                                    <option value="Filtros">Filtros</option>
                                    <option value="Motor">Motor</option>
                                    <option value="Mangueras">Mangueras</option>
                                    <option value="Opticos">Opticos</option>
                                    <option value="Refrigeración">Refrigeración</option>
                                    <option value="Retenes">Retenes</option>
                                    <option value="Rodamientos">Rodamientos</option>
                                    <option value="Sensores">Sensores</option>
                                    <option value="Suspensión">Suspensión</option>
                                    <option value="Transmisión">Transmisión</option>
                                    <option value="Pastillas Freno Delanteras">Pastillas Freno Delanteras</option>
                                    <option value="Pastillas Freno Traseras">Pastillas Freno Traseras</option>
                                    <option value="Válvulas">Válvulas</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip id="pos">
                                    {errors.cat}
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridFab">
                                <Form.Label>Fabricante</Form.Label>
                                <Form.Control placeholder="Ingrese Fabricante" 
                                    name="fab"
                                    value={values.fab}
                                    onChange={handleChange}
                                />
                                </Form.Group>
                            </Row>
                            
                            <Row className="ib-3">
                                <Form.Group as={Col} controlId="formGridModel">
                                    <Form.Label>Modelo</Form.Label>
                                    <Form.Control placeholder="Ingrese Modelos Compatibles" 
                                        name="model"
                                        value={values.model}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridVer">
                                    <Form.Label>Versión(es)</Form.Label>
                                    <Form.Control placeholder="Ingrese Versiones Compatibles" 
                                        name="ver"
                                        value={values.ver}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridYear">
                                    <Form.Label>Año(s)</Form.Label>
                                    <Form.Control placeholder="Ingrese Años Compatibles (AAAA-AAAA)"
                                        name="year"
                                        value={values.year}
                                        onChange={handleChange}
                                        isInvalid={!!errors.year}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip id="pos">
                                        {errors.year}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="ib-3">
                                <Form.Group as={Col} controlId="formGridOrigen">
                                <Form.Label>Origen</Form.Label>
                                <Form.Control placeholder="Ingresar país de origen" 
                                    name="origen"
                                    value={values.origen}
                                    onChange={handleChange}
                                />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridUbicacion">
                                <Form.Label>Ubicación</Form.Label>
                                <Form.Select defaultValue="Seleccione Ubicación"
                                    name="ubicacion"
                                    value={values.ubicacion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.ubicacion}
                                >
                                    <option value="Default">Seleccione Ubicación</option>
                                    <option value="Bodega">Bodega</option>
                                    <option value="Mostrador">Mostrador</option>
                                    <option value="Vitrina">Vitrina</option>
                                    <option value="Otro">Otro</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip id="pos">
                                    {errors.ubicacion}
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridObs">
                                <Form.Label>Observaciones</Form.Label>
                                <Form.Control as="textarea" placeholder="Añadir Observación" 
                                    name="nota"
                                    value={values.nota}
                                    onChange={handleChange}
                                />
                                </Form.Group>
                            </Row>
                            <Row className="ib-3">
                                <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="number" placeholder="Precio del Producto" 
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    isInvalid={!!errors.price}
                                />
                                <Form.Control.Feedback type="invalid" tooltip id="pos">
                                    {errors.price}
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridStock">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control type="number" placeholder="Cantidad a Ingresar" 
                                    name="stock"
                                    value={values.stock}
                                    onChange={handleChange}
                                    isInvalid={!!errors.stock}
                                />
                                <Form.Control.Feedback type="invalid" tooltip id="pos">
                                    {errors.stock}
                                </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCritic">
                                <Form.Label>Nivel Crítico</Form.Label>
                                <Form.Control type="number" placeholder="Nivel crítico para generar alerta (0 = sin alerta)" 
                                    name="critic"
                                    value={values.critic}
                                    onChange={handleChange}
                                    isInvalid={!!errors.critic}
                                />
                                <Form.Control.Feedback type="invalid" tooltip id="pos">
                                    {errors.critic}
                                </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Form.Group className="ib-4" id="formGridCheckbox">
                                <Form.Check type="checkbox" label="Confirmo que los datos son correctos" 
                                    required
                                    name="isCorrect"
                                    onChange={handleChange}
                                    isInvalid={!!errors.isCorrect}
                                    feedback={errors.isCorrect}
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                            <div className="threeButtons">
                            <Link to="/inv"><Button variant="dark" size="lg"><i class="fas fa-undo"/> Volver</Button></Link>
                            <div className="centrado">
                            <Button id="espaciado" type = "reset" variant="danger" size="lg" onClick={() => resetForm()}>Vaciar Campos <i class="far fa-trash-alt"/></Button>
                            <Button id="espaciado" type="submit" variant="success" size="lg">Ingresar Producto  <i class="fas fa-check"/></Button>
                            </div>  
                            </div>
                        </Container>
                    </Form>
                    )}
                    </Formik>  
                </div>
            </div>
        </div>   
    );
}

export default Ingreso;