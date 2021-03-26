import Notificacao from '../schema/NotificationSchema';
import User from '../models/User';

class NotifificacaoController {
    async index(req, res){
        const isPrestadorServico = await User.findOne({
            where: {id: req.userId, prestador_servico: true},
        });
        if(!isPrestadorServico){
            return res
            .status(401)
            .json({ mensagem: "Usuario não é prestador de serviço"})
        }

        const notificacoes = await Notificacao.find({
            user: req.userId,
        })
        .sort({ createdAt: "desc"})
        .limit(20);

        return res.json(notificacoes);
    }
    async update(req, res){
        const notificacoes = await Notificacao.findByIdAndUpdate(
            req.params.id,
            {read: true},
            {new: true}
        );
        return res.json(notificacoes);
    }
}

export default new NotifificacaoController();