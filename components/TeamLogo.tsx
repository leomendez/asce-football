import Image from "next/image";
import styled from "styled-components";

type TeamLogoProps = {
    src: string
    alt: string
}

export default function TeamLogo({ src, alt }: TeamLogoProps) {
    return (
        <Logo>
            <Image 
                src={src} 
                alt={alt}
                width={64}
                height={64}
            />
        </Logo>
    )
}

const Logo = styled.div`
    border: 1px solid black;
    border-radius: 50%;
    padding: 0.5em;
`;