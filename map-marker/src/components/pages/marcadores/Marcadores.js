import React, {Component} from 'react'
// Leaft
import {
    Map,
    TileLayer,
    Marker,
    Popup,
    LayerGroup,
    LayersControl,
    CircleMarker,
    Tooltip
} from 'react-leaflet'
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import {getall, marker} from './axios';
import {Redirect} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';

const {BaseLayer, Overlay} = LayersControl
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), iconUrl: require('leaflet/dist/images/marker-icon.png'), shadowUrl: require('leaflet/dist/images/marker-shadow.png')});

export const funny = new L.Icon({
    iconUrl: 'https://image.flaticon.com/icons/svg/817/817760.svg',
    iconSize: [30, 30]
});

export default class Marcadores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal:false,
            redirectTo: false,
            reload: false,
            data: [],
            lat: "",
            lng: "",
            msg: "",
            location: {
                lat: 0,
                lng: 0
            },
            zoom: 2
        };
        this.handleClick = this.handleClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }
    handleClick(e) {
        this.setState({
            lat: e.latlng.lat,
            lng: e.latlng.lng
        });
    }

    async componentDidMount() {
        try {
            let apiReturns = await getall();
            this.setState({data: apiReturns.data});
            this.fetchData();
        } catch (e) {
            console.log(e);
        }
    }

    onClickButtonLogin(e) {
       this.setState({redirectTo:true})
      }
    onClickButtonModal(e) {
        this.setState({
            openModal: !this.state.openModal
          });
      
      }
      onTextChange(e){
        const {name, value} = e.target;
        this.setState({[name]:value});
      }
      async onClickButtonMarker() {
        try {
            let check =await marker(this.state.lat,this.state.lng,this.state.msg);
            if(check){
                this.setState({
                    "reload": true
                });
            }
            else{
                alert("Error al crear Marcador 1.");
            }
           
        } catch (e) {
            alert("Error al crear Marcador 2.");
        }
      }


    fetchData() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                zoom: 13
            })
        }, () => {
            fetch('https://ipapi.co/json').then(res => res.json()).then(location => {
                this.setState({
                    location: {
                        lat: location.latitude,
                        lng: location.longitude
                    },
                    zoom: 7
                });
            });
        });

    }

    render() {

        if (this.state.redirectTo) {
            return (
                <Redirect to={'/login'}/>
            )
        }
        if (this.state.reload) {
            return (
                <Redirect to={'/'}/>
            )
        }
        return (<>
            <Map center={
                    [this.state.location.lat, this.state.location.lng]
                }
                zoom={
                    this.state.zoom
                }
                minZoom={2.5}
                maxZoom={20}
                onClick={
                    this.handleClick
            }>
                <LayersControl position="topright">

                    <BaseLayer checked name="Dark Mode">
                        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"/>
                    </BaseLayer>

                    <BaseLayer name="Base Mapa">

                        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    </BaseLayer>

                    <Overlay checked name="New Marker">
                        <LayerGroup> {
                            this.state.lat && <Marker position={
                                    [this.state.lat,this.state.lng]
                                }
                                draggable={true}>
                                    <Popup>
                                    Coords:
                                    <pre>Latitude : {this.state.lat} <br/>
                                        Longitude : {this.state.lng}</pre>

                                    <Modal isOpen={this.state.openModal} >
                                        <ModalHeader>Add New Marker</ModalHeader>
                                        <ModalBody>

                                        

                                            <label>latitude</label>
                                            <input type="number" name="lat" disabled value={this.state.lat}  />
               

                                       
                                            <label>longitude</label>
                                            <input type="number" name="lng" disabled value={this.state.lng}   />
                               
                                    
                                            <label>Message</label>
                                            <input type="text" name="msg" onChange={this.onTextChange} />
                                       

                                        </ModalBody>
                                        <ModalFooter>
                                        <Button  onClick={()=>this.onClickButtonMarker()}color="primary">Create</Button>

                                        <Button onClick={()=>this.onClickButtonModal()} color="secondary">Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                    
                                    {this.props.auth.isLogged ?
                                    <Button onClick={()=>this.onClickButtonModal()} color="success">Add</Button>
                                    : <Button onClick={()=>this.onClickButtonLogin()} outline color="info">Login</Button>} 

                                    </Popup>

                                
                            </Marker>
                        } </LayerGroup>
                    </Overlay>


                    <Overlay checked name="Markers around the world">

                        <LayerGroup> {
                            this.state.data.map((item) => {
                                return (<Marker position={
                                        item.geometry.coordinates
                                    }
                                    icon={funny}>
                                    <Popup>
                                        <div>
                                            <span>Message :
                                                <br/><br/>{
                                                item.Message
                                            }</span>
                                        </div>
                                        <div>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <span>
                                                <strong>By : {
                                                    item.infocreated.userEmail
                                                }</strong>
                                            </span>
                                        </div>
                                    </Popup>
                                </Marker>);
                            })
                        } </LayerGroup>
                    </Overlay>

                </LayersControl>
                <CircleMarker center={
                        [14.059685, -87.218065]
                    }
                    radius={10}>
                    <Tooltip sticky direction="left"
                        offset={
                            [-8, -2]
                        }
                        opacity={1}
                        permanent
                        interactive={true}>
                        <div>
                            Hello, I´m <strong>Rodrigo Erazo </strong>From <strong>Honduras</strong>
                            <br/>If you want to
                            <a href="https://paypal.me/rodrigoerazo595" target="_blank">Support me</a><br/>you can buy me a Beer here
                        </div>
                    </Tooltip>
                </CircleMarker>

            </Map>
        </>)
    }
}
