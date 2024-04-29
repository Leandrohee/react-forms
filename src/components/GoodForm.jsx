import { useForm } from "react-hook-form";                          
import validator from "validator";                                  //biblioteca externa

const GoodForm = () => {
  const {
    register,                                                       //Referencia o campo input, select 
    handleSubmit,                                                   //gerencia o submite
    formState: { errors },                                          //errors é um objeto
    watch,                                                          //watch verifica a alteração do campo a cada mudanca
  } = useForm();

  const onSubmit = (event) => {
    console.log(event);
  };


  const watchPassword = watch('password');                          //monitora a cada mudanca o campo 'senha'. Necessario para fazer a verificacao da confirmacao de senha

console.log(watchPassword)

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          {...register("name", { required: true })}
        />
        {errors?.name?.type === "required" && (<p className="error-message">Name deve ser preenchido</p>)}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register("email", {required: true, validate: value => validator.isEmail(value)})}
        />
        {errors?.email?.type === 'required' && <p className="error-message">O email deve ser preenchido</p>}
        {errors?.email?.type === 'validate' && <p className="error-message">O email deve ser válido</p>}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register("password", { required: true, minLength: 7 })}
        />
        {errors?.password?.type === "minLength" && (<p className="error-message">A senha tem que ser maior que 7 caracteres</p>)}
        {errors?.password?.type === "required" && (<p className="error-message">A senha deve ser preenchida</p>)}
      </div>

      <div className="form-group">
        <label>Confirmação de senha</label>
        <input
          className={errors?.passwordConfirmation && "input-error"}
          type="password"
          placeholder="Digite sua senha novamente"
          {...register("passwordConfirmation", {required: true ,validate: value => value = watchPassword})}
        />
        {errors?.passwordConfirmation?.type === 'validate' && (<p className="error-message">As senhas não estão iguais!</p>)}
        {errors?.passwordConfirmation?.type === 'required' && (<p className="error-message">Preencha a confirmação de senha!</p>)}
      </div>

      <div className="form-group">
        <label>Profissão</label>
        <select
        className={errors?.profession && "input-error"}
        {...register("profession",{validate: (value)=>{return value !== 0 }})}
        >
          <option value="0">Selecione sua profissão...</option>
          <option value="developer">Desenvolvedor</option>
          <option value="other">Outra</option>
        </select>
        {errors?.profession?.type === 'validate' && (<p className="error-message">Selecione uma profissão</p>)}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register("privacyTerms", {required: true})}
          />
          <label>I agree with the privacy terms.</label>
        </div>
        {errors?.privacyTerms?.type === 'required' && (
          <p className="error-message">Aceite os termos de uso</p>
        )}
      </div>
      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default GoodForm;
