const Login = {
    template: `
        <div class="max-w-md mx-auto my-12 bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">Sign In Admin</h2>
            
            <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Alamat Email</label>
                    <input v-model="useremail" type="email" required placeholder="admin@example.com"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input v-model="userpassword" type="password" required placeholder="******"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <button type="submit" :disabled="loading"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition disabled:bg-blue-300">
                    {{ loading ? 'Memvalidasi...' : 'Masuk' }}
                </button>
            </form>
        </div>
    `,
    data() {
        return {
            useremail: '',
            userpassword: '',
            errorMessage: '',
            loading: false
        }
    },
    methods: {
        handleLogin() {
            this.loading = true;
            this.errorMessage = '';

            axios.post(`${API_URL}/login`, {
                useremail: this.useremail,
                userpassword: this.userpassword
            })
            .then(response => {
                const res = response.data;
                if (res.status === 200) {
                    // Simpan data token dan role ke localStorage browser
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('user_role', res.user.role);
                    localStorage.setItem('user_id', res.user.id);

                    // Mengubah status login global di instance root Vue (index.html)
                    this.$root.isLoggedIn = true;

                    alert('Selamat datang kembali, Admin!');
                    // Alihkan navigasi langsung ke halaman dashboard admin
                    this.$router.push('/dashboard');
                }
            })
            .catch(error => {
                this.loading = false;
                if (error.response && error.response.data) {
                    this.errorMessage = error.response.data.messages.error || 'Email atau password salah.';
                } else {
                    this.errorMessage = 'Gagal terhubung ke API server backend.';
                }
            });
        }
    }
};