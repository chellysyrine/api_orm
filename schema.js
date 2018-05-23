var Schema ={
 etudiant :{
    id: {type: 'increments', nullable: false, primary: true},
    email: {type: 'string', maxlength: 254, nullable: false, unique: true},
    firstName: {type: 'string', maxlength: 150, nullable: false},
    lastName :{ type: 'string', maxlength: 150, nullable: false},
    cin:{type : 'string', nullable:false},
    date_naissance:{ type :'date'},
    username:{type :'string', maxlength: 150, nullable: false},
    password:{type : 'string' , maxlength : 150, nullable : false},
    id_classe:{type : 'integer', nullable : true, unseigned :true}
 },
admin:{
    id: {type: 'increments', nullable: false, primary: true},
    email: {type: 'string', maxlength: 254, nullable: false, unique: true},
    firstName: {type: 'string', maxlength: 150, nullable: false},
    lastName :{ type: 'string', maxlength: 150, nullable: false},
    cin:{type : 'string', nullable:false},
    date_naissance:{ type :'date'},
    username:{type :'string', maxlength: 150, nullable: false},
    password:{type : 'string' , maxlength : 150, nullable : false},

},
 enseignant:{
    id: {type: 'increments', nullable: false, primary: true},
    email: {type: 'string', maxlength: 254, nullable: false, unique: true},
    firstName: {type: 'string', maxlength: 150, nullable: false},
    lastName :{ type: 'string', maxlength: 150, nullable: false},
    cin:{type : 'string', nullable:false},
    date_naissance:{ type :'date'},
    username:{type :'string', maxlength: 150, nullable: false},
    password:{type : 'string' , maxlength : 150, nullable : false},


 },
 classe:{
    id: {type: 'increments', nullable: false, primary: true},
    nom:{ type :'string', maxlength:254, nullable:false },
    id_niveau:{type :'integer', unseigned:true}

 },
 absence :{
    id: {type: 'increments', nullable: false, primary: true},
    date_absence:{type :'dateTime', nullable:false},
    id_seance:{type :'integer', unseigned:true},
    id_etudiant:{type :'integer', unseigned:true}
    },
seance:{
    id: {type: 'increments', nullable: false, primary: true},
    date_debut:{type : 'dateTime' },
    date_fin :{type :'dateTime'},
    id_classe:{type : 'integer', nullable : false, unseigned :true},
    id_matier:{type : 'integer', nullable : false, unseigned :true},
    id_salle:{type : 'integer', nullable : false, unseigned :true},
    id_annee:{type : 'integer', nullable : false, unseigned :true}
},
matiere:{
    id: {type: 'increments', nullable: false, primary: true},
    nom :{type:'string', nullable:false , maxlength:150},
    coefficient:{type:'integer'},
    type:{type:'string', maxlength:150},
    etat:{type:'integer'},
    id_note:{type : 'integer', nullable : false, unseigned :true},
    id_unite:{type : 'integer', nullable : false, unseigned :true}
},
niveau:{
    id: {type: 'increments', nullable: false, primary: true},
    description:{type :'string',maxlength:150},
    id_specialite:{type : 'integer', nullable : false, unseigned :true}
},
note: {
    id: {type: 'increments', nullable: false, primary: true},
    valeur:{type :'float'},
    id_etudiant:{type :'integer', unseigned:true}
},
paiement:{
    id: {type: 'increments', nullable: false, primary: true},
    mode:{type:'string'},
    montant:{type:'float'},
    date:{type:'date'},
    id_etudiant:{type :'integer', unseigned:true},
    id_annee:{type : 'integer', nullable : false, unseigned :true}
},
salle:{
    id: {type: 'increments', nullable: false, primary: true},
    nom_salle:{type :'string'},
    etage_salle:{type :'integer'}
},
specialite:{
    id: {type:'increments', nullable: false, primary: true},
    description:{type:'string'},
    type_plan:{type:'string'},
    description_plan:{type:'string'}
},
unite:{
    id: {type: 'increments', nullable: false, primary: true},
   nom_module:{type:'string'},
   credit:{type:'integer'},
   coefficient:{type:'integer'},
   id_niveau:{type :'integer', unseigned:true}
},
typeNote:{
    id: {type: 'increments', nullable: false, primary: true},
    description:{type:'string'},
    id_note:{type :'integer', unseigned:true}
},
actualites:{
    id: {type: 'increments', nullable: false, primary: true},
    titre:{type:'string'},
    description:{type:'string'},
    date:{type:'date'},
    id_admin:{type :'integer', unseigned:true},
    actImage:{type:'string'}
},
annee:{
    id: {type: 'increments', nullable: false, primary: true},
    description:{type:'string'},
    date_debut:{type : 'date' },
    date_fin :{type :'date'},
},

noteinfo:{
    id: {type: 'increments', nullable: false, primary: true},
    titre:{type:'string'},
    description:{type:'string'},
    date:{type:'date'},

}
 };
 module.exports = Schema;


 

 

