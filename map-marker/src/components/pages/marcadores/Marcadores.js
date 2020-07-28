import React, {Component} from 'react'
// Leaft
import {
    Map,
    TileLayer,
    Marker,
    Popup,
    FeatureGroup,
    LayerGroup,
    LayersControl,
    CircleMarker,
    Tooltip
} from 'react-leaflet'
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import {getall} from './axios';

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
            data: [],
            currentPos: null,
            location: {
                lat: 0,
                lng: 0
            },
            zoom: 2
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.setState({currentPos: e.latlng});
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
        return (<>
            <Map center={
                    [this.state.location.lat, this.state.location.lng]
                }
                zoom={
                    this.state.zoom
                }
                minZoom={2.5}
                maxZoom={18}
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
                            this.state.currentPos && <Marker position={
                                    this.state.currentPos
                                }
                                draggable={true}>
                                <Popup position={
                                    this.state.currentPos
                                }>
                                    Coordenadas:
                                    <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
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
                            Hello, I´m
                            <strong>
                                Rodrigo Erazo
                            </strong>
                            From
                            <strong>
                                Honduras
                            </strong>
                            <br/>If you want to
                            <a href="https://paypal.me/rodrigoerazo595" target="_blank">Support me</a><br/>you can buy me a Beer here
                        </div>
                    </Tooltip>
                </CircleMarker>

            </Map>
        </>)
    }
}
