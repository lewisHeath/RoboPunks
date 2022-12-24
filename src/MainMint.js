import React from "react";
import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import roboPunksNFT from './RoboPunksNFT.json';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const roboPunksNFTAddress = '0x544E9f356dc0603874f97dBa345FA728f259d9a1';

const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint () {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(roboPunksNFTAddress, roboPunksNFT.abi, signer);
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString())
                });
                console.log("response", response);
            } catch (err) {
                console.log("error", err);
            }
        }
    }

    const handleDecrement = () => {
        if(mintAmount <= 1) {
            return;
        }
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if(mintAmount >= 3) {
            return;
        }
        setMintAmount(mintAmount + 1);
    }

    return (
        <Flex justify='center' align='center' height='100vh' paddingBottom='150px'>
            <Box width='520px'>
                <div>
                    <Text fontSize='48px' textShadow='0 5px #000000'>RoboPunks</Text>
                    <Text 
                        fontSize='30px'
                        letterSpacing='-5.5%'
                        fontFamily='VT323'
                        textShadow='0 2px 2px #000000'
                    >It's 2078. Can the RoboPunks NFT save humans from rampant NFT speculation? Mint RoboPunks to find out!</Text>
                </div>
                {isConnected ? (
                    <div>
                        <Flex align='center' justify='center'>
                            <button onClick={handleDecrement} className='custom-button'>-</button>
                            <Input type="number" value={mintAmount} readOnly width='100px' height='40px' textAlign='center'  marginTop='10px' fontFamily='inherit' />
                            <button onClick={handleIncrement} className='custom-button'>+</button>
                        </Flex>
                        <button onClick={handleMint} className='custom-button'>Mint Now!</button>
                    </div>
                ) : (
                    <p>You must be connected to mint!</p>
                )}
            </Box>
        </Flex>
    )
}

export default MainMint;