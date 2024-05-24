import{A as y,B as q,C as G,D as z,E as P,F as B,G as Q,H as W,I as J,J as K,K as O,L as U,M as X,N as H,O as Y,P as Z,Q as $,R as ee,S as te,T as oe,U as x,V as ie,a as c,b as h,c as u,d as v,e as b,f,g as C,h as F,i as g,j as r,k as n,l as s,m as E,n as w,o as _,p as a,q as I,r as j,s as V,t as D,u as L,v as T,w as k,x as A,y as M,z as R}from"./chunk-LPNNIWNW.js";var pe=(t,e)=>({"fa-eye":t,"fa-eye-slash":e});function de(t,e){t&1&&(r(0,"div",21),a(1," Email is required. "),n())}function ce(t,e){t&1&&(r(0,"div",21),a(1," Please enter a valid email address. "),n())}function ue(t,e){t&1&&(r(0,"span",21),a(1," Password is required. "),n())}var re=(()=>{let e=class e{constructor(m,o,i){this.fb=m,this.authService=o,this.router=i,this.loginForm=this.fb.group({email:["",[y.required,y.email]],password:["",y.required]})}onSubmit(){if(this.loginForm.valid){let m=this.loginForm.controls.email.value,o=this.loginForm.controls.password.value;this.authService.login(m,o).then(i=>{alert("Successfully Logged in"),this.router.navigate(["main"])}).catch(i=>{if(console.log(i),i.code=="auth/user-not-found"){alert("user not found");return}alert(i.message)})}else alert("User not found!")}forgot(){}};e.\u0275fac=function(o){return new(o||e)(C(W),C(Z),C(A))},e.\u0275cmp=h({type:e,selectors:[["app-login"]],decls:29,vars:8,consts:[["passwordInput",""],[1,"container-fluid","vh-100"],[1,"d-flex","gap-3","h-100"],[1,"box","w-50","d-flex","align-items-center","justify-content-center"],["src","../../../../assets/images/games.jpg","width","600px","height","600px"],[1,"flex-grow-1","d-flex","flex-column","gap-3","align-items-center","justify-content-center","p-3"],["src","../../../../assets/images/logo.png","width","200px","height","200px"],[1,"w-75",3,"ngSubmit","formGroup"],[1,"form-floating","mb-3"],["type","email","id","email","formControlName","email",1,"form-control"],["for","email",1,"form-label"],["class","text-danger",4,"ngIf"],[1,"input-group","mb-3"],[1,"form-floating"],["type","password","id","password","formControlName","password","name","password","required","",1,"form-control"],["for","password",1,"form-label"],["type","button",1,"btn","btn-outline-secondary",3,"click"],[1,"far",3,"ngClass"],[1,"d-flex","flex-column","gap-2","w-100"],["type","submit",1,"btn","btn-dark","btn-md"],["type","button",1,"btn","btn-light","text-danger",3,"click"],[1,"text-danger"]],template:function(o,i){if(o&1){let l=E();r(0,"div",1)(1,"div",2)(2,"div",3),s(3,"img",4),n(),r(4,"div",5),s(5,"img",6),r(6,"h5"),a(7,"Welcome Admin!"),n(),r(8,"form",7),w("ngSubmit",function(){return v(l),b(i.onSubmit())}),r(9,"div",8),s(10,"input",9),r(11,"label",10),a(12,"Email:"),n(),F(13,de,2,0,"div",11)(14,ce,2,0,"div",11),n(),r(15,"div",12)(16,"div",13),s(17,"input",14,0),r(19,"label",15),a(20,"Password:"),n(),F(21,ue,2,0,"span",11),n(),r(22,"button",16),w("click",function(){v(l);let d=_(18);return b(d.type=d.type==="text"?"password":"text")}),s(23,"i",17),n()(),r(24,"div",18)(25,"button",19),a(26,"Login"),n(),r(27,"button",20),w("click",function(){return v(l),b(i.forgot())}),a(28," Forgot Password "),n()()()()()()}if(o&2){let l,p,d,N=_(18);f(8),g("formGroup",i.loginForm),f(5),g("ngIf",((l=i.loginForm.get("email"))==null?null:l.hasError("required"))&&((l=i.loginForm.get("email"))==null?null:l.touched)),f(),g("ngIf",((p=i.loginForm.get("email"))==null?null:p.hasError("email"))&&((p=i.loginForm.get("email"))==null?null:p.touched)),f(7),g("ngIf",((d=i.loginForm.get("password"))==null?null:d.invalid)&&((d=i.loginForm.get("password"))==null?null:d.touched)),f(2),g("ngClass",I(5,pe,N.type==="password",N.type==="text"))}},dependencies:[j,V,z,R,q,G,Q,P,B]});let t=e;return t})();var fe=[{path:"",redirectTo:"/login",pathMatch:"full"},{path:"login",component:re},{path:"main",component:$,loadChildren:()=>import("./chunk-SVKWQ6AD.js").then(t=>t.AdministratorRoutingModule)}],ne=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=u({type:e}),e.\u0275inj=c({imports:[M.forRoot(fe),M]});let t=e;return t})();var me=(()=>{let e=class e{constructor(){this.title="analytical"}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=h({type:e,selectors:[["app-root"]],decls:1,vars:0,template:function(o,i){o&1&&s(0,"router-outlet")},dependencies:[k]});let t=e;return t})();var ae=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=u({type:e}),e.\u0275inj=c({imports:[D,ie,x]});let t=e;return t})();var le=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=u({type:e,bootstrap:[me]}),e.\u0275inj=c({providers:[K(()=>O({projectId:"analytical-8e3db",appId:"1:434635194953:web:cc095a538c1c1942137598",storageBucket:"analytical-8e3db.appspot.com",apiKey:"AIzaSyC4sV9VjdvTxEDJyWg9audnG89FW67PXzA",authDomain:"analytical-8e3db.firebaseapp.com",messagingSenderId:"434635194953"})),U(()=>X()),H(()=>Y()),te(()=>oe())],imports:[T,ne,x,ee,J,ae]});let t=e;return t})();L().bootstrapModule(le).catch(t=>console.error(t));
