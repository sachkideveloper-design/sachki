// firebase-init.js - Inicializa Firebase (App + Firestore + Auth) como script normal

(function () {
    function cargarScript(src, cb) {
        const s = document.createElement('script');
        s.src = src;
        s.onload = cb;
        s.onerror = () => console.error('Error cargando:', src);
        document.head.appendChild(s);
    }

    function initFirebase() {
        const firebaseConfig = {
            apiKey: "AIzaSyBFQ84x5uYLCqejKNrG4lPj6Az2mrgTb24",
            authDomain: "fit-manyacts.firebaseapp.com",
            projectId: "fit-manyacts",
            storageBucket: "fit-manyacts.firebasestorage.app",
            messagingSenderId: "453534938293",
            appId: "1:453534938293:web:922cdd392dbdcc571e3afc"
        };
        window._firebaseConfig = firebaseConfig;
        const app = firebase.initializeApp(firebaseConfig);

        // Firestore
        window.db = firebase.firestore();

        // Storage (fotos de perfil)
        window.storage = firebase.storage();

        // Auth
        window.auth = firebase.auth();

        // SDK helpers para storage.js
        window.firestoreSDK = {
            collection : (db, path)           => db.collection(path),
            doc        : (db, col, id)         => db.collection(col).doc(id),
            getDoc     : (ref)                 => ref.get(),
            getDocs    : (q)                   => q.get(),
            setDoc     : (ref, data)           => ref.set(data),
            updateDoc  : (ref, data)           => ref.update(data),
            deleteDoc  : (ref)                 => ref.delete(),
            addDoc     : (ref, data)           => ref.add(data),
            query      : (ref, ...constraints) => {
                let q = ref;
                constraints.forEach(fn => { q = fn(q); });
                return q;
            },
            where: (field, op, val) => (ref) => ref.where(field, op, val)
        };

        // Auth helpers para storage.js
        window.authSDK = {
            signInWithEmailAndPassword  : (email, pass) => window.auth.signInWithEmailAndPassword(email, pass),
            createUserWithEmailAndPassword: (email, pass) => window.auth.createUserWithEmailAndPassword(email, pass),
            sendPasswordResetEmail      : (email)       => window.auth.sendPasswordResetEmail(email),
            signOut                     : ()            => window.auth.signOut(),
            onAuthStateChanged          : (cb)          => window.auth.onAuthStateChanged(cb)
        };

        console.log('Firebase listo');
        window.dispatchEvent(new Event('firebaseReady'));
    }

    // Cargar SDKs compat: app primero, luego firestore, auth y storage EN PARALELO
    cargarScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js', function () {
        let listos = 0;
        function alListo() {
            listos++;
            if (listos === 3) initFirebase();
        }
        cargarScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js', alListo);
        cargarScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js', alListo);
        cargarScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js', alListo);
    });
})();
