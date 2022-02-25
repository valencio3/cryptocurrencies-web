import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
padding: 50px 10px;

@media(max-width:600px){
    padding: 20px 10px;
}
`

export const CryptoPanel = styled.div`
background-color: #f1e7fe;
padding: 30px;
border-radius: 15px;
width: 30%;
margin: 15px auto;

@media(max-width:600px){
    width: 90%;
    padding: 10px;
}
`

export const PanelRow = styled.div`
    margin-bottom: 10px;
`

export const RowwKey = styled.span`
 font-family: 'bold';
 margin-right: 10px;
`

export const RowValue = styled.span`
font-family: 'regular';
`
export const BackLinkPanel = styled.div`
margin: auto;
width: 300px;
`
export const BackLink = styled(Link)`
text-decoration: none;
`
export const BackButton = styled.button`
background-color: #a537fd;
color: white;
border: none;
border-radius: 5px;
padding: 10px 20px;
width: 100%;
font-family: 'bold';
font-size: 100%;
cursor: pointer;
`
