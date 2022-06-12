import Image from "next/image";
import { ReactElement } from "react";
import styled from "styled-components";
import { Team, Venue } from "../../types";

type InfoItemProps = {
    label: string;
    value: string | number;
}


export default function InfoItem({ label, value }: InfoItemProps): ReactElement {
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