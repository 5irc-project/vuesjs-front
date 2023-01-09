#  Coexya/Sakai Admin Boilerplate for Vue  
 
### Live Preview
 
Visit [Sakai Vue](https://www.primefaces.org/sakai-vue) website for a live preview. 
 
### Getting Started
Sakai is an application template for Vue based on the [Vue CLI](https://cli.vuejs.org/) that provides out-of-the-box standard
tooling for Vue projects. To get started, clone this repository from GitHub and install the dependencies with npm or yarn.
                
```
npm install
```

or

```
yarn
```

Next step is running the application using the serve script and navigate to **http://localhost:8080/** to view the application.
That is it, you may now start with the development of your application using the Sakai template.</p>

```
npm run serve
```

### Vue CLI Scripts
Following commands are derived from create-app-app.
```
"npm run serve": Starts the development server
"npm run build": Builds the application for deployment.
"npm run lint": Executes the lint checks.
"npm run test:unit": Runs the tests.
```

### .Env
Following variables influence the app state.
```
VUE_APP_PUBLIC_PATH=/
VUE_APP_I18N_LOCALE=fr
VUE_APP_I18N_FALLBACK_LOCALE=fr
VUE_APP_API_BASE_URL=https://localhost:52545/api
VUE_APP_LOG=true
VUE_APP_USER_AUTHENTICATION=true
VUE_APP_CORS_ACCESS_CONTROL_ALLOW_ORIGIN=*
VUE_APP_CORS_ALLOW=*
```

In case you would like to use environment variables inside the application, please use ```document.env``` instead of ```process.env```. Thanks to **env.js**, you will be allowed to change environment variables in production via **configuration.js** by setting the variables into the localstorage.
> For example if you are in a production environment and ```VUE_APP_LOG=false```, you will be able to change it to ```VUE_APP_LOG=true``` and therefore the logs will be shown again.

### Structure
Sakai consists of 2 main parts; the application layout and the resources. **App.vue** inside src folder is the main component containing the template for the base layout whereas required resources such as SASS structure for the layout are placed inside the **src/assets/** folder.</p>

### Layout Components
Main layout is the template of the **App.vue**, it is divided into a couple of child components such as topbar, menu and footer. Here is template of the
**App.vue** component that implements the logic such as menu state, layout modes and so on.

### Menu
Menu is a separate component defined in **AppMenu.vue** file based on PrimeVue MenuModel API. In order to define the menuitems,
navigate to data section of **App.vue** file and define your own model as a nested structure using the **menu** property.

### Dependencies
Dependencies of Sakai are listed below and needs to be added to package.json.

```json
{
    "primevue": "~3.12.2",
    "primeicons": "~5.0.0",
    "primeflex": "~3.1.2",
}
```

### PrimeVue Theme
Sakai uses the free Saga, Arya and Vela themes which are distributed within PrimeVue, however it can be used with any PrimeVue theme as well such as material, tailwind and bootstrap as layout colors are derived from the theme used via CSS variables.

### SASS Variables
In case you'd like to customize the layout variables, open **_variables.scss** file under src/layout folder. The list is pretty short as majority of the variables are derived from the PrimeVue theme being used.

**src/assets/_variables.scss**
```css
$font-size:1rem;
$$layout-border-radius:12px;
$transition-duration:.2s;
```

### Store
Please refer to <a href="https://pinia.vuejs.org/">pinia</a> if you need further informations.

### Utils
-   **Http.js** is a wrapper of Axios in case you need to change for whatever reason.
-   **events.js** is an EventBus so it defines all the global events

### Services
All services must inherit the **ApiService.js** class as it defines some usefull functionalities for your endpoints.

All services must get registered in the factory **services/index.js**, it allows the dependency injection of your services.

> Don't forget to provide your service with a valid key defined in **serviceKeys.js**.

### Plugins
-   **date.js** exposes ``` $d(date, format)```, that formats a date.
-   **env.js** overrides ```document.env```
-   **log.js** can disable logs by the console
-   **primevue.js** imports prime-vue

### Router
The router uses the userStore so the authentication can implemented in routes.
For example: 
<br>

#### Public routes
```js
const routes = [
  {
    path: "/",
    name: "accueil",
    component: Accueil,
    meta: {
      public: true
    }
  }
];
```
Accueil will now allow not authenicated users to access itself.
<br>

#### Authenticated routes
```js
const routes = [
  {
    path: "/",
    name: "accueil",
    component: Accueil,
    meta: {
      authorize: ROLES.ADMINISTRATEUR
      // or authorize: [ROLES.ADMINISTRATEUR, ROLES.USER]
    }
  }
];
```
Accueil will now only allow users authenicated as **ADMINISTRATEUR** to access itself.
<br>

#### Disable authentication

These features can be disabled if the following environment variable is set to: ```VUE_APP_USER_AUTHENTICATION=false```.

### Proposals

Please message me via teams or email if you think this boilerplate is missing something, we will discuss about the necessity of this feature and how to implement it.  