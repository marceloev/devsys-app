<template>
	<div :style="cssProps">
		<form id="form-login" @submit="doLogin" action="javascript:void(0);">
			<div class="text-center">
				<div class="modal-dialog">
					<div class="col-lg-8 col-sm-8 col-12 main-section">
						<div class="modal-content">
							<div class="col-lg-12 col-sm-12 col-12 user-img">
								<img ref="userImg" style="border-radius: 50px;" :src="defaultUserImg" />
							</div>
							<div class="col-lg-12 col-sm-12 col-12 user-name">
								<h2>
									<u>Acessar Sinergia</u>
								</h2>
							</div>
							<div class="alert alert-danger" v-if="doLoginQParam">
								<font size="4">Por favor, faça o login!</font>
							</div>
							<div class="alert alert-danger" v-if="wrongPasswordQParam">
								<font size="4">Usuário/Senha inválidos!</font>
							</div>
							<div class="alert alert-info" v-if="logoutQParam">
								<font size="4">Logout efetuado com sucesso!</font>
							</div>
							<div class="col-lg-12 col-sm-12 col-12 form-input">
								<div class="form-group">
									<label class="float-left" for="username">Login:</label>
									<input
										type="text"
										class="form-control text-uppercase"
										id="username"
										name="username"
										ref="username"
										autocomplete="username"
										required
										@blur="getUserFoto()"
									/>
								</div>
								<div class="form-group">
									<label class="float-left" for="password">Senha:</label>
									<input
										type="password"
										class="form-control"
										id="password"
										name="password"
										ref="password"
										autocomplete="current-password"
									/>
								</div>
								<button class="btn btn-success">Acessar o Sistema</button>
							</div>
							<div class="col-lg-12 col-sm-12 col-12 link-part">
								<a>Esqueceu sua senha? (not ready)</a>
								<br />
								<a>Deseja fazer um novo cadastro? (not ready)</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import UserService from "@/domain/user/UserService.js";
	export default {
		name: "Login",
		data() {
			return {
				doLoginQParam: false,
				wrongPasswordQParam: false,
				logoutQParam: false,
				defaultUserImg: this.$getUserFotoURL("ADMIN"),
				cssProps: {
					height: "100%",
					width: "100%",
					position: "absolute",
					background:
						`url(${require("@/assets/wallpaper.jpg")})` +
						"no-repeat center center fixed",
					"-webkit-background-size": "cover",
					"-moz-background-size": "cover",
					"-o-background-size": "cover",
					"background-size": "cover"
				}
			};
		},
		created() {
			this.service = new UserService(this.$http, "users");
		},
		mounted() {
			this.$refs.username.focus();
			this.doLoginQParam = this.$route.query["doLogin"];
			this.wrongPasswordQParam = this.$route.query["badCredentials"];
			this.logoutQParam = this.$route.query["logout"];
		},
		methods: {
			async getUserFoto() {
				const username = this.$refs.username.value.trim();
				const elem = this.$refs.userImg;
				if (username) {
					elem.src = this.$getUserFotoURL(username, true);
				} else {
					elem.src = this.defaultUserImg;
				}
			},
			doLogin() {
				const username = this.$refs.username.value.trim();
				const password = this.$refs.password.value.trim();
				this
					.service
					.findByLogin(username, password)
					.then(resp => {
						localStorage.setItem("user", JSON.stringify(resp.data));
						const nextUrl = localStorage.getItem("nextPath");
						this.$router.push(nextUrl || "/");
						this.$router.go();
					})
					.catch(err => {
						console.error(err)
						this.doLoginQParam = false;
						this.logoutQParam = false;
						this.wrongPasswordQParam = true;
						this.$mensagem("error", "Usuário/Senha inválidos!");
						this.$refs.password.value = "";
					});
			}
		}
	};
</script>

<style scoped>
	.main-section {
		margin: 0 auto;
		margin-top: 100px;
		border-radius: 5px;
		padding: 0px;
	}
	.user-img {
		margin-top: -50px;
	}
	.user-img img {
		height: 100px;
		width: 100px;
	}
	.user-name {
		margin: 10px 0px;
	}
	.user-name h1 {
		font-size: 30px;
		color: #676363;
	}
	.user-name button {
		position: absolute;
		top: -50px;
		right: 20px;
		font-size: 30px;
	}
	.form-input button {
		width: 100%;
		margin-bottom: 20px;
	}
	.link-part {
		border-radius: 0px 0px 5px 5px;
		background-color: #ecf0f1;
		padding: 15px;
		border-top: 1px solid #c2c2c2;
	}
	.open-modal {
		margin-top: 100px !important;
	}
	#username,
	#password {
		text-align: center;
	}
</style>