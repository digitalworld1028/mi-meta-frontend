import { Link, Outlet } from 'react-router-dom';
import {useNavigate}  from 'react-router';
import { Container, Row, Col, Nav, Stack, Badge } from 'react-bootstrap';
import useMetaMask from '../hooks/metamask';
import '../styles/login.scss';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const {connect, disconnect, isActive, account} = useMetaMask()!;
    useEffect(()=> {
        console.log(account);
        if (account !== undefined) {
            navigate(-1);
        }
    }, []);

    useEffect(()=> {
        console.log(account);
        if (account !== undefined) {
            navigate(-1);
        }
    }, [account]);

    return (
        <Container className="login" fluid>
            <Row className="justify-content-between wallet-item mx-auto" onClick={connect}>
                <Col className="type-item">
                    <img src="/icons/metamask.png" width={30} /><span className="ps-3 text-light">MetaMask</span>
                </Col>
                <Col className="badge-item">
                    <span className="badge-content">Popular</span>
                </Col>
            </Row>
            <Row className="justify-content-between wallet-item mx-auto" >
                <Col className="type-item">
                    <img src="/icons/coinbase.png" width={30}/><span className="ps-3 text-light">Coinbase</span>
                </Col>
            </Row>
            <Row className="justify-content-between wallet-item mx-auto" >
                <Col className="type-item">
                    <img src="/icons/trust wallet.png" width={30}/><span className="ps-3 text-light" >Trust Wallet</span>
                </Col>
            </Row>
            <Row className="justify-content-between wallet-item mx-auto" >
                <Col className="type-item">
                <img src="/icons/phantom.png" width={30}/><span className="ps-3 text-light">Phantom</span>
                </Col>
                <Col className="badge-item">
                    <span className="badge-content">Solana</span>
                </Col>
            </Row>
        </Container>
    );
};

export { Login };