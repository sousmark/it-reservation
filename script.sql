create table employee
(
    id        varchar(50) not null
        constraint employee_pk
            primary key,
    "isAdmin" boolean
);

create table service
(
    id          serial
        constraint service_pk
            primary key,
    title       varchar(100),
    description varchar(200),
    id_employee varchar(50)
        constraint service_employee_id_fk
            references employee,
    name        varchar(50)
);

create table event
(
    id          serial
        primary key,
    title       varchar(50),
    date        timestamp,
    start       varchar(10),
    finish      varchar(10),
    description varchar(250),
    creator     varchar(30),
    id_service  integer
        constraint event_service_id_fk
            references service
);