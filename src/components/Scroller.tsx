import React from 'react'
import styled,{keyframes,css} from 'styled-components'
const Scroller = () => {
    const row1 = [
        "https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/6437f6a78547cc72b9575994_voci.png",
        "https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/6437f6a7b8b8f9d99a8467e3_voxist.png",
        "	https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/6437f6a3df145bba2eb03139_symbl.png",
        "https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/6437f6a0863fc9ea50e46179_aws.png",
        "https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/6437f6a286f44b760ba104bf_revai.png",
        "https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/6437f6a0cefb7828d17a8b6a_deepl.png",
      ];
    
      const row2 = [
        "../../public/gemini.png",
        "../../public/mistral.png",
        "https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/6437f6a29874809bd29bb662_openai.png",
        "../../public/huggingface.png",
        "../../public/Meta-Logo.png",
        "../../public/llamaindex.png",
        "https://assets-global.website-files.com/61e7d259b7746e2d1df0b68d/6437f6a1098d982c7db45a47_ibm.png"
      ];


  return (
    <AppContainer >
      <Wrapper >
        <Text className='dark:text-white text-black md:text-5xl  text-center px-3' >With The State Of The Art Models</Text>
        <Note className='dark:text-white text-black text-center'>One stop. Endless solutions. AI powered.</Note>
        <Marquee>
          <MarqueeGroup>
            {row1.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
            {row1.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
        </Marquee>
        <Marquee>
          <MarqueeGroup2>
            {row2.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
          <MarqueeGroup2>
            {row2.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
        </Marquee>
      </Wrapper>
    </AppContainer>
  );
}

export default Scroller

const AppContainer = styled.div`
  width: 90vw;
  height: fit;
  color: #000000;
  background-color:;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #02203c;
`;

const Note = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 40px;
  
`;

const Marquee = styled.div`
  display: flex;
  width: 1200px;
  overflow: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
`;
const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  width: clamp(10rem, 1rem + 40vmin, 30rem);
  padding: calc(clamp(10rem, 1rem + 30vmin, 30rem) / 10);
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  /* border: 1px solid black; */
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
  padding: 5px 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;