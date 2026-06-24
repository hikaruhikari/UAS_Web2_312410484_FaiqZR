const Dashboard = {
    template: `
        <div>
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">Panel Kendali Admin</h1>
                    <p class="text-sm text-gray-500">Kelola rincian data laporan pengaduan masyarakat secara real-time.</p>
                </div>
                <div class="bg-blue-50 border border-blue-200 text-blue-700 text-sm px-4 py-2 rounded-md font-medium">
                    Role: Administrator 🛡️
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-5 rounded-lg shadow border-l-4 border-yellow-500 flex justify-between items-center">
                    <div><p class="text-gray-500 text-sm font-semibold uppercase tracking-wider">Status Pending</p><p class="text-2xl font-bold text-gray-800">{{ countStatus('Pending') }}</p></div>
                    <div class="text-2xl">⏳</div>
                </div>
                <div class="bg-white p-5 rounded-lg shadow border-l-4 border-orange-500 flex justify-between items-center">
                    <div><p class="text-gray-500 text-sm font-semibold uppercase tracking-wider">Sedang Diproses</p><p class="text-2xl font-bold text-gray-800">{{ countStatus('Diproses') }}</p></div>
                    <div class="text-2xl">⚙️</div>
                </div>
                <div class="bg-white p-5 rounded-lg shadow border-l-4 border-green-500 flex justify-between items-center">
                    <div><p class="text-gray-500 text-sm font-semibold uppercase tracking-wider">Laporan Selesai</p><p class="text-2xl font-bold text-gray-800">{{ countStatus('Selesai') }}</p></div>
                    <div class="text-2xl">✅</div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow overflow-hidden mb-8 border border-blue-100">
                <div class="px-6 py-4 bg-blue-50 border-b border-blue-100">
                    <h2 class="text-lg font-bold text-blue-800">➕ Form Tambah Pengaduan Baru (Sisi Masyarakat)</h2>
                    <p class="text-xs text-blue-600">Gunakan form ini untuk mengambil screenshot simulasi input data aduan baru.</p>
                </div>
                <form @submit.prevent="submitComplaint" class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Judul Laporan</label>
                            <input v-model="form.judul_laporan" type="text" required placeholder="Contoh: Pipa Air Bocor di Jalan Merdeka"
                                class="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Kategori Pengaduan</label>
                            <select v-model="form.id_kategori" required class="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                <option value="" disabled>-- Pilih Kategori --</option>
                                <option v-for="cat in categories" :key="cat.id_kategori" :value="cat.id_kategori">
                                    {{ cat.nama_kategori }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Foto Bukti (.jpg / .png)</label>
                            <input type="file" ref="fileInput" @change="handleFileUpload" required accept="image/*"
                                class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                        </div>
                    </div>
                    <div class="flex flex-col justify-between">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Isi Laporan / Deskripsi Kejadian</label>
                            <textarea v-model="form.isi_laporan" rows="4" required placeholder="Jelaskan secara rinci kronologi masalah fasilitas umum..."
                                class="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                        </div>
                        <div class="text-right mt-4">
                            <button type="submit" :disabled="submitting" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2 rounded shadow transition disabled:bg-blue-300">
                                {{ submitting ? 'Mengirim Laporan...' : '🚀 Kirim Pengaduan' }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 class="text-lg font-bold text-gray-700">Daftar Pengaduan Masuk (Manajemen Operasi)</h2>
                    <button @click="fetchData" class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded transition">🔄 Segarkan Data</button>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                <th class="px-6 py-3 font-semibold">ID</th>
                                <th class="px-6 py-3 font-semibold">Pelapor & Tanggal</th>
                                <th class="px-6 py-3 font-semibold">Kategori & Judul</th>
                                <th class="px-6 py-3 font-semibold">Foto Bukti</th>
                                <th class="px-6 py-3 font-semibold">Status (Edit/PUT)</th>
                                <th class="px-6 py-3 font-semibold text-center">Aksi Operasi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 text-sm">
                            <tr v-for="(item, idx) in complaints" :key="item.id_pengaduan" class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4 font-medium text-gray-900">{{ idx + 1 }}</td>
                                <td class="px-6 py-4">
                                    <div class="font-semibold text-gray-800">{{ item.username }}</div>
                                    <div class="text-xs text-gray-400">{{ new Date(item.created_at).toLocaleDateString('id-ID') }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-0.5 rounded mb-1 inline-block">{{ item.nama_kategori }}</span>
                                    <div class="font-medium text-gray-700">{{ item.judul_laporan }}</div>
                                    <p class="text-xs text-gray-400 mt-1 max-w-xs truncate">{{ item.isi_laporan }}</p>
                                </td>
                                <td class="px-6 py-4">
                                    <img :src="'http://localhost:8080/uploads/' + item.foto_bukti" class="w-16 h-12 object-cover rounded border border-gray-200 shadow-sm">
                                </td>
                                <td class="px-6 py-4">
                                    <select @change="updateStatus(item.id_pengaduan, $event.target.value)"
                                        :class="{
                                            'bg-yellow-50 text-yellow-700 border-yellow-300 focus:ring-yellow-400': item.status === 'Pending',
                                            'bg-orange-50 text-orange-700 border-orange-300 focus:ring-orange-400': item.status === 'Diproses',
                                            'bg-green-50 text-green-700 border-green-300 focus:ring-green-400': item.status === 'Selesai'
                                        }"
                                        class="text-xs font-bold rounded border px-2 py-1 focus:outline-none focus:ring-2 cursor-pointer transition">
                                        <option value="Pending" :selected="item.status === 'Pending'">⏳ Pending</option>
                                        <option value="Diproses" :selected="item.status === 'Diproses'">⚙️ Diproses</option>
                                        <option value="Selesai" :selected="item.status === 'Selesai'">✅ Selesai</option>
                                    </select>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <button @click="deleteComplaint(item.id_pengaduan)" class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold px-3 py-1.5 rounded transition">
                                        🗑️ Hapus Laporan
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="complaints.length === 0">
                                <td colspan="6" class="text-center py-8 text-gray-400">Tidak ada pengaduan masyarakat yang tersedia.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            complaints: [],
            categories: [],
            submitting: false,
            form: {
                judul_laporan: '',
                id_kategori: '',
                isi_laporan: '',
                foto_bukti: null
            }
        }
    },
    mounted() {
        this.fetchData();
        this.fetchCategories();
    },
    methods: {
        fetchData() {
            axios.get(`${API_URL}/pengaduan`)
                .then(response => {
                    this.complaints = response.data.data;
                })
                .catch(error => {
                    console.error("Gagal menarik data master pengaduan:", error);
                });
        },
        fetchCategories() {
            // Mengambil daftar kategori dari API untuk dimasukkan ke select dropdown form
            axios.get(`${API_URL}/kategori`)
                .then(response => {
                    this.categories = response.data.data;
                })
                .catch(error => {
                    console.error("Gagal memuat kategori:", error);
                });
        },
        handleFileUpload(event) {
            this.form.foto_bukti = event.target.files[0];
        },
        submitComplaint() {
            this.submitting = true;

            // Karena ada upload file fisik, kita wajib menggunakan FormData objek (Arsitektur REST Multipart)
            const formData = new FormData();
            formData.append('id_user', localStorage.getItem('user_id') || '1'); // otomatis mengambil id user yang sedang login
            formData.append('id_kategori', this.form.id_kategori);
            formData.append('judul_laporan', this.form.judul_laporan);
            formData.append('isi_laporan', this.form.isi_laporan);
            formData.append('foto_bukti', this.form.foto_bukti);

            axios.post(`${API_URL}/pengaduan`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                alert('Sukses! Laporan pengaduan baru berhasil diinput langsung ke server.');
                
                // Reset Form input setelah sukses
                this.form.judul_laporan = '';
                this.form.id_kategori = '';
                this.form.isi_laporan = '';
                this.form.foto_bukti = null;
                this.$refs.fileInput.value = ''; // mengosongkan input file fisik

                this.submitting = false;
                this.fetchData(); // Refresh isi tabel agar laporan baru langsung muncul di bawah
            })
            .catch(error => {
                this.submitting = false;
                alert('Gagal menambah laporan. Periksa ekstensi file atau ukuran data Anda.');
                console.error(error);
            });
        },
        updateStatus(id, newStatus) {
            const params = new URLSearchParams();
            params.append('status', newStatus);

            axios.put(`${API_URL}/pengaduan/${id}`, params)
                .then(response => {
                    alert('Status laporan sukses diperbarui!');
                    this.fetchData();
                })
                .catch(error => {
                    alert('Gagal memperbarui status.');
                    console.error(error);
                });
        },
        deleteComplaint(id) {
            if (confirm('Apakah Anda yakin ingin menghapus permanen laporan aduan ini?')) {
                axios.delete(`${API_URL}/pengaduan/${id}`)
                    .then(response => {
                        alert('Laporan pengaduan berhasil dihapus.');
                        this.fetchData();
                    })
                    .catch(error => {
                        alert('Operasi hapus gagal.');
                        console.error(error);
                    });
            }
        },
        countStatus(statusName) {
            return this.complaints.filter(item => item.status === statusName).length;
        }
    }
};
