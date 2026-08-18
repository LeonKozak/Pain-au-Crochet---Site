/* =========================
   AUTH STATE
========================= */

function updateAuthNavigation(session) {

    const signInLink =
        document.querySelector(".sign-in");


    if (!signInLink) {
        return;
    }


    const existingSignOutLink =
        document.getElementById("sign-out-link");


    /* =========================
       USER IS SIGNED IN
    ========================= */

    if (session && session.user) {

        const user =
            session.user;


        const name =
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "Account";


        /*
            Change "Sign In"
            to the user's name.
        */

        signInLink.textContent =
            `Hi, ${name}`;

        signInLink.href =
            "account.html";


        /*
            Add a Sign Out link
            if one does not already exist.
        */

        if (!existingSignOutLink) {

            const signOutLink =
                document.createElement("a");


            signOutLink.id =
                "sign-out-link";

            signOutLink.href =
                "#";

            signOutLink.textContent =
                "Sign Out";


            signInLink.insertAdjacentElement(
                "afterend",
                signOutLink
            );


            signOutLink.addEventListener(
                "click",
                async function (event) {

                    event.preventDefault();


                    const { error } =
                        await supabaseClient.auth.signOut({
                            scope: "local"
                        });


                    if (error) {

                        console.error(
                            "Sign out error:",
                            error.message
                        );

                        return;
                    }


                    window.location.href =
                        "index.html";

                }
            );

        }

    }


    /* =========================
       USER IS SIGNED OUT
    ========================= */

    else {

        signInLink.textContent =
            "Sign In";

        signInLink.href =
            "account.html";


        if (existingSignOutLink) {

            existingSignOutLink.remove();

        }

    }

}



/* =========================
   LISTEN FOR AUTH CHANGES
========================= */

supabaseClient.auth.onAuthStateChange(
    function (event, session) {

        updateAuthNavigation(
            session
        );

    }
);