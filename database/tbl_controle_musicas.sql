#cria um database
create database db_controle_musicas_ba;

#Ativa o database a ser utilizado
use db_controle_musicas_ba;

#Cria a tabela de musica
create table tbl_musica (
	id 				int not null primary key auto_increment,
    nome 			varchar(80) 	not null,
    duracao 		time			not null,
    data_lancamento	date			not null,
    foto_capa		varchar(200),
    letra			text
);

#Cria a tabela de usúario
create table tbl_usuario (
id     int not null primary key auto_increment,
    nome varchar(80) not null,
email     varchar(80) not null,
senha     varchar(45) not null,
foto_perfil     varchar(80)
);


#Cria a tabela gravadora
create table tbl_gravadora (
id int not null primary key auto_increment,
    nome varchar(80) not null,
    telefone varchar(45) not null,
    email varchar(80) not null
);

#Cria a tabela banda
create table tbl_banda (
id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_criacao date  not null
);

#Cria a tabela genero
create table tbl_genero (
id int not null primary key auto_increment,
    genero varchar(80) not null
);
   

#Cria a tabela tipo_album
create table tbl_tipo_album (
id_tipo   int not null primary key auto_increment,
    tipo   varchar(80) not null
);
   
#Cria a tabela artista
create table tbl_artista (
    id int not null primary key auto_increment,
    nome varchar(80),
    biografia varchar(80)
);
show tables;
desc tbl_musica;
select * from tbl_musica;
