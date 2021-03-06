--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15
-- Dumped by pg_dump version 10.15

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


ALTER TABLE public.kelas OWNER TO gijinkabot;

--
-- Data for Name: kelas; Type: TABLE DATA; Schema: public; Owner: gijinkabot
--

COPY public.kelas (roleid, hari, jam, matkul) FROM stdin;
759774771847757834	1	07:00	Jaringan Nirkabel
759774530444591126	1	10:00	Realita Virtual dan Augmentasi
759774622534336562	1	10:00	Pemrograman Perangkat Bergerak
759774588140912661	1	13:00	Teknopreneurship
760318003543408690	2	10:00	Evolusi Perangkat Lunak
760318042566688798	2	13:00	Komputasi Bergerak
760318072719933481	2	13:00	Sistem Temu Kembali Informasi
760318108849930280	2	16:00	Visi Komputer
760777448039645185	3	07:00	Biomedik
760776180236025856	3	10:00	Robotika
760778052916609045	3	13:00	Teknologi Antar Jaringan
760778085909528616	3	13:00	Sistem Enterprise
760776302252392460	3	16:00	Teknik Pengembangan Game
760779088146464820	3	16:00	Sistem Informasi Geografis
779272356367564800	5	07:00	Riset Operasional
779272473190465557	4	10:00	Basis Data Terdistribusi
779271813816647690	4	13:00	Komputasi Awan
779272577645805570	4	16:00	Konstruksi Perangkat Lunak
\.


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
    tanggal DATE,
    CONSTRAINT fk_roleid FOREIGN KEY (roleid) REFERENCES  kelas(roleid) ON DELETE CASCADE ON UPDATE CASCADE
);
