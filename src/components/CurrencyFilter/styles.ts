import styled from 'styled-components'

export const Container = styled.div`
padding: 10px 10px;
display: flex;
flex-direction: row;
justify-content: center;
/* align-content: space-between; */
/* background-color: red; */
width: 30%;
margin: 0 auto 15px auto;
border-radius: 10px;
`
export const Card = styled.div`
/* padding: 10px 10px; */
display: flex;
`
export const Filter = styled.input.attrs({type: 'radio'})`
 display: flex;
 font-family: 'regular';
`
export const Label = styled.label`
font-family: 'regular';
margin-right: 5px;
`
