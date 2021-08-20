--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15
-- Dumped by pg_dump version 10.15

--- CREATE USER hpfadly WITH PASSWORD 'jw8s0F4';
select * from public.credit;


ALTER TABLE public.credit OWNER TO hpfadly;



CREATE UNIQUE INDEX idx_userid_credit
ON public.credit(roleid);

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: kelas; Type: TABLE; Schema: public; Owner: gijinkabot
--

CREATE TABLE public.kelas (
    roleid text NOT NULL,
    hari integer,
    jam text,
    matkul text
);


ALTER TABLE public.credit (
    roleid text NOT NULL,
    credit integer
);

ALTER TABLE public.kelas OWNER TO gijinkabot;

--
-- Data for Name: kelas; Type: TABLE DATA; Schema: public; Owner: gijinkabot
--



--
-- Name: kelas kelas_pkey; Type: CONSTRAINT; Schema: public; Owner: gijinkabot
--

ALTER TABLE ONLY public.kelas
    ADD CONSTRAINT kelas_pkey PRIMARY KEY (roleid);


--
-- PostgreSQL database dump complete
--

CREATE TABLE public.tugas (
    id SERIAL PRIMARY KEY,
    roleid text NOT NULL,
    hari integer,
    deadline_jam text,
    deskripsi text,
    tanggal DATE
);
