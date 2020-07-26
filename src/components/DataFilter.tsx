import React, {useState} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    background: #f3c623;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
    padding: 12px 0;
    width: 100%;
    > ul {
       display: flex;
       justify-content: center;
       align-items: center; 
       > li {
           border: 1px solid #333333;
           font-size: 16px;
           text-align: center;
           color: #333333;
           border-radius: 4px;
           margin: 0 2px;
           &.selected {
               background: #333333;
               color: #f3c623;
           }
       }     
    }
    .in-out {
        width: 40%;
        > li {
            padding: 4px 10px;
        }        
    }
    .date {
        width: 50%;
        > li {
            padding: 4px 18px;
        }    
    }
`

const typeMap = {"-":"支出","+":"收入"}
const dateMap = {"day":"日", "month":"月", "year":"年"}
type TypeList = keyof typeof typeMap
type DateList = keyof typeof dateMap
const DataFilter:React.FC = ()=>{
    const [typeList] = useState<TypeList[]>(["-","+"])
    const [dateList] = useState<DateList[]>(["day","month","year"])
    const [selectedType,setSelectedType] = useState("-")
    const [selectedDate,setSelectedDate] = useState("day")
    return(
        <Wrapper>
            <ul className="in-out">
                {typeList.map(i=><li key={i} className={selectedType===i?"selected":""}
                                     onClick={()=>setSelectedType(i)}>{typeMap[i]}
                </li>)}
            </ul>
            <ul className="date">
                {dateList.map(d=><li key={d} className={selectedDate===d?"selected":""}
                                     onClick={()=>setSelectedDate(d)}>{dateMap[d]}
                </li>)}
            </ul>
        </Wrapper>
    )
}
export {DataFilter}