--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2024-10-25 21:39:40 PDT

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 49236)
-- Name: calendarentity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calendarentity (
    id integer NOT NULL,
    location integer,
    "user" character varying(40),
    year integer,
    message text,
    month character varying(20),
    roomstring character varying(255)
);


ALTER TABLE public.calendarentity OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 49235)
-- Name: calendarentity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.calendarentity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.calendarentity_id_seq OWNER TO postgres;

--
-- TOC entry 3622 (class 0 OID 0)
-- Dependencies: 214
-- Name: calendarentity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.calendarentity_id_seq OWNED BY public.calendarentity.id;


--
-- TOC entry 221 (class 1259 OID 49269)
-- Name: roomsreq; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roomsreq (
    id integer NOT NULL,
    owner character varying(50),
    requester character varying(50),
    room character varying(50),
    accues boolean DEFAULT false
);


ALTER TABLE public.roomsreq OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 49268)
-- Name: roomsreq_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roomsreq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roomsreq_id_seq OWNER TO postgres;

--
-- TOC entry 3623 (class 0 OID 0)
-- Dependencies: 220
-- Name: roomsreq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roomsreq_id_seq OWNED BY public.roomsreq.id;


--
-- TOC entry 219 (class 1259 OID 49262)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50),
    password character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 49261)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3624 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 217 (class 1259 OID 49245)
-- Name: yourrooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.yourrooms (
    id integer NOT NULL,
    roomname character varying(50) NOT NULL,
    owner character varying(50) NOT NULL
);


ALTER TABLE public.yourrooms OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 49244)
-- Name: yourrooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.yourrooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.yourrooms_id_seq OWNER TO postgres;

--
-- TOC entry 3625 (class 0 OID 0)
-- Dependencies: 216
-- Name: yourrooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.yourrooms_id_seq OWNED BY public.yourrooms.id;


--
-- TOC entry 3454 (class 2604 OID 49239)
-- Name: calendarentity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calendarentity ALTER COLUMN id SET DEFAULT nextval('public.calendarentity_id_seq'::regclass);


--
-- TOC entry 3457 (class 2604 OID 49272)
-- Name: roomsreq id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roomsreq ALTER COLUMN id SET DEFAULT nextval('public.roomsreq_id_seq'::regclass);


--
-- TOC entry 3456 (class 2604 OID 49265)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3455 (class 2604 OID 49248)
-- Name: yourrooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.yourrooms ALTER COLUMN id SET DEFAULT nextval('public.yourrooms_id_seq'::regclass);


--
-- TOC entry 3610 (class 0 OID 49236)
-- Dependencies: 215
-- Data for Name: calendarentity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.calendarentity (id, location, "user", year, message, month, roomstring) FROM stdin;
302	12	tester2	2024	adds	October	group1test
305	5	testuser1	2024	jdka,ndkjasdadhkanksjdad	October	
306	5	testuser1	2024	kajsdnakjsdnma	October	
307	5	testuser1	2024	asdkankjsd	October	
308	5	testuser1	2024	jahmdbjkhbads	October	
309	5	testuser1	2024	jahdsbhkasd	October	
319	5	testuser1	2024	wedwed	October	
322	3	testuser1	2024	asdasdas	October	
323	3	testuser1	2024	dasdasd	October	
324	3	testuser1	2024	asdasdads	October	
325	3	testuser1	2024	adasd	October	
326	3	testuser1	2024	dasdsada	October	
327	3	testuser1	2024	asdasd	October	
328	3	testuser1	2024	adsdasd	October	
329	3	testuser1	2024	asdasd	October	
330	3	testuser1	2024	adsasd	October	
331	4	testuser1	2024	asdasd	October	
332	3	testuser1	2024	adsads	October	
333	3	testuser1	2024	asdasd	October	
334	3	testuser1	2024	asdas	October	
335	3	testuser1	2024	adasdasd	October	
336	3	testuser1	2024	adsdasd	October	
337	3	testuser1	2024	asdasd	October	
338	3	testuser1	2024	asdasd	October	
339	3	testuser1	2024	asdasda	October	
340	3	testuser1	2024	asdasd	October	
341	3	testuser1	2024	adasd	October	
349	3	testuser1	2024	sadsd	October	
350	3	testuser1	2024	asdasd	October	
\.


--
-- TOC entry 3616 (class 0 OID 49269)
-- Dependencies: 221
-- Data for Name: roomsreq; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roomsreq (id, owner, requester, room, accues) FROM stdin;
\.


--
-- TOC entry 3614 (class 0 OID 49262)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
42	testuser1	23raul
43	tester2	23Raul
\.


--
-- TOC entry 3612 (class 0 OID 49245)
-- Dependencies: 217
-- Data for Name: yourrooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.yourrooms (id, roomname, owner) FROM stdin;
112	jlasda	testuser1
\.


--
-- TOC entry 3626 (class 0 OID 0)
-- Dependencies: 214
-- Name: calendarentity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.calendarentity_id_seq', 359, true);


--
-- TOC entry 3627 (class 0 OID 0)
-- Dependencies: 220
-- Name: roomsreq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roomsreq_id_seq', 66, true);


--
-- TOC entry 3628 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 43, true);


--
-- TOC entry 3629 (class 0 OID 0)
-- Dependencies: 216
-- Name: yourrooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.yourrooms_id_seq', 115, true);


--
-- TOC entry 3460 (class 2606 OID 49243)
-- Name: calendarentity calendarentity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calendarentity
    ADD CONSTRAINT calendarentity_pkey PRIMARY KEY (id);


--
-- TOC entry 3466 (class 2606 OID 49275)
-- Name: roomsreq roomsreq_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roomsreq
    ADD CONSTRAINT roomsreq_pkey PRIMARY KEY (id);


--
-- TOC entry 3464 (class 2606 OID 49267)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3462 (class 2606 OID 49250)
-- Name: yourrooms yourrooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.yourrooms
    ADD CONSTRAINT yourrooms_pkey PRIMARY KEY (id);


-- Completed on 2024-10-25 21:39:40 PDT

--
-- PostgreSQL database dump complete
--

