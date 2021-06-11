/* Se necesita exportar la constante app para que pueda ser cargada por el RouteProvider */
const express = require("express");
const { Router } = require( '~/core' );
Router.use( express.static( aurora.paths.root('public') ) );