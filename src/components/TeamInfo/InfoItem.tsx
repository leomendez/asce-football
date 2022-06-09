import Image from "next/image";
import styled from "styled-components";
import { Team, Venue } from "../../types";

type InfoItemProps = {
    label: string;
    value: string | number;
}


export default function InfoItem({ label, value }: InfoItemProps) {
    return (
        <Item>
            <span><b>{label}:</b></span>
            <span>{value}</span>
        </Item>
    )
}

const Item = styled.div`
    display: flex;
    gap: 1em;
`